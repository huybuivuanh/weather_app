const express = require("express");
const fetchWeatherData = require("../APIs/weatherAPI");

const router = express.Router();

router.post("/weather", async (req, res) => {
  const weatherData = await fetchWeatherData(req.body);
  if (weatherData) {
    res.json(weatherData);
  } else {
    res.status(500).send("Error getting weather data");
  }
});

module.exports = router;
