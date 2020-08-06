import express from 'express';
import performanceRouter from './performance';

const controllers = express.Router();
controllers.use('/performance', performanceRouter);

export default controllers;
