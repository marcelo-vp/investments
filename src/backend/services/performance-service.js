const axios = require('axios');
const helpers = require('../common/helpers');

class PerformanceService {
    constructor() {
        this._data_url = process.env.DATA_URL;
        this._historical_data = null;
    }

    _getDateRange(payload) {
        return {
            start: helpers.parsePayloadDate(payload.investmentDate),
            end: helpers.parsePayloadDate(payload.currentDate),
        };
    }

    _isDateInsideRange(record, dateRange) {
        let isInside = false;
        const date = helpers.parseRecordDate(record.date);

        if (date.diff(dateRange.start) >= 0 && date.diff(dateRange.end) <= 0) {
            isInside = true;
        }

        return isInside;
    }

    _buildResponseData(dailyRecords, payload) {
        const responseData = [];
        const dateRange = this._getDateRange(payload);
        let remaining = dailyRecords.length;
        let compoundFactor = 1.0;

        while (remaining > 0) {
            const index = remaining - 1;
            const record = dailyRecords[index];

            if (this._isDateInsideRange(record, dateRange)) {
                const dailyRate = helpers.getDailyRate(record.nominalRate);
                const isLastRecord = remaining - 1 == 0;

                compoundFactor = helpers.updateCompoundFactor(
                    compoundFactor,
                    dailyRate,
                    payload.cdbRate,
                    isLastRecord
                );
                responseData.unshift({
                    date: helpers.formatResponseDate(record.date),
                    unitPrice: helpers.getUnitPrice(compoundFactor),
                });
            }

            remaining--;
        }

        return responseData;
    }

    _parseFromCsv(csv) {
        const lines = csv.split('\r\n');
        const parsedData = lines.map((line) => {
            const values = line.split(',');
            return {
                date: values[1],
                nominalRate: values[2],
            };
        });
        return parsedData;
    }

    async getHistoricalData() {
        if (!this._historical_data) {
            const response = await axios.get(this._data_url);
            this._historical_data = this._parseFromCsv(response.data);
        }
        return this._historical_data;
    }

    async getPerformanceHistory(payload) {
        const dailyRecords = await this.getHistoricalData();
        return this._buildResponseData(dailyRecords, payload);
    }
}

module.exports = PerformanceService;
