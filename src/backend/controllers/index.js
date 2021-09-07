const router = require('express').Router();
const performanceController = require('./performance');
const serviceController = require('./services');

router.use('/performance', performanceController);
router.use('/service-list', serviceController);

module.exports = router;
