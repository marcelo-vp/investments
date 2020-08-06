import axios from 'axios';

const DATA_URL =
    'https://gorila-blog.s3-us-west-2.amazonaws.com/CDI_Prices.csv';

class PerformanceService {
    constructor() {
        this._data_url = DATA_URL;
        this._historical_data = null;
    }
    async _getHistoricalData() {
        if (!this._historical_data) {
            const csvData = await axios.get(this._data_url);
            console.log(csvData);
            // this._historical_data = parseFromCsv(csvData);
        }
        return this._historical_data;
    }
    async getPerformanceHistory(requestBody) {
        const historicalData = await this._getHistoricalData();
        console.log(historicalData, requestBody);
        // From historicalData, calculate multiplying factors per day
        // according to date range
    }
}

export default PerformanceService;
