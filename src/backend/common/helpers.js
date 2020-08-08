const moment = require('moment');

const RECORD_DATE_FMT = 'DD/MM/YYYY';
const APP_DATE_FMT = 'YYYY-MM-DD';

const getDailyRate = (nominalRate) => {
    const rawValue = (nominalRate / 100 + 1) ** (1 / 252) - 1;
    return parseFloat(rawValue.toFixed(8));
};

const updateCompoundFactor = (factor, dailyRate, cdbRate, isLastRecord) => {
    const precision = isLastRecord ? 8 : 16;
    const dailyFactor = 1 + dailyRate * (cdbRate / 100);
    return parseFloat((factor * dailyFactor).toFixed(precision));
};

const getUnitPrice = (factor) => {
    const unitPrice = 1000.0;
    return parseFloat((unitPrice * factor).toFixed(2));
};

const parsePayloadDate = (dateStr) => {
    return moment(dateStr, APP_DATE_FMT);
};

const parseRecordDate = (dateStr) => {
    return moment(dateStr, RECORD_DATE_FMT);
};

const formatResponseDate = (dateStr) => {
    return moment(dateStr, RECORD_DATE_FMT).format(APP_DATE_FMT);
};

module.exports = {
    getDailyRate,
    updateCompoundFactor,
    getUnitPrice,
    parsePayloadDate,
    parseRecordDate,
    formatResponseDate,
};
