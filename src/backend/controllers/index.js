const express = require('express');
const performanceRouter = require('./performance');

const controllers = express.Router();
controllers.use('/performance', performanceRouter);

module.exports = controllers;
