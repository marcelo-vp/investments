import axios from 'axios';
import {
    getDailyRate,
    updateCompoundFactor,
    getUnitPrice,
    parsePayloadDate,
    parseRecordDate,
    formatResponseDate,
} from '../common/helpers';

const DATA_URL =
    'https://gorila-blog.s3-us-west-2.amazonaws.com/CDI_Prices.csv';

class PerformanceService {
    constructor() {
        this._data_url = DATA_URL;
        this._historical_data = null;
    }

    _getDateRange(payload) {
        return {
            start: parsePayloadDate(payload.investmentDate),
            end: parsePayloadDate(payload.currentDate),
        };
    }

    _isDateInsideRange(record, dateRange) {
        let isInside = false;
        const date = parseRecordDate(record.date);

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
                const dailyRate = getDailyRate(record.nominalRate);
                const isLastRecord = remaining - 1 == 0;

                compoundFactor = updateCompoundFactor(
                    compoundFactor,
                    dailyRate,
                    payload.cdbRate,
                    isLastRecord
                );
                responseData.unshift({
                    date: formatResponseDate(record.date),
                    unitPrice: getUnitPrice(compoundFactor),
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

    async _getHistoricalData() {
        if (!this._historical_data) {
            const response = await axios.get(this._data_url);
            this._historical_data = this._parseFromCsv(response.data);
        }
        return this._historical_data;
    }

    async getPerformanceHistory(payload) {
        const dailyRecords = await this._getHistoricalData();
        return this._buildResponseData(dailyRecords, payload);
    }
}

export default PerformanceService;
