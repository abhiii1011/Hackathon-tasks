const express = require('express');
const router = express.Router();
const controller = require('../controllers/weatherController');

router.get('/current', controller.getCurrentWeather);
router.get('/forecast', controller.getForecast);

module.exports = router;
