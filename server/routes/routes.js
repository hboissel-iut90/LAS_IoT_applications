const express = require("express");
const router = express.Router();
const temperatureController = require("../controllers/temperatureController");
const humidityController = require("../controllers/humidityController");
const accelerometerController = require("../controllers/accelerometerController");

////////////// Get data //////////////
router.get("/temperature", temperatureController.getTemperature);

router.get("/humidity", humidityController.getHumidity);

router.get("/accelerometer", accelerometerController.getAccelerometer);

////////////// Register data //////////////

router.post("/temperature", temperatureController.addTemperature);

router.post("/humidity", humidityController.addHumidity);

router.post("/accelerometer", accelerometerController.addAccelerometer);

module.exports = router;