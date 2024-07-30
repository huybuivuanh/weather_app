const axios = require("axios");
const moment = require("moment-timezone");

async function fetchWeatherData(coord) {
  const apiKey = "cde8450bada1f84f0d757b1465a7cd43";
  const city = "Prince Albert";
  // const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weather = response.data;

    // Process the weather data
    const processedData = weather.list.map((entry) => {
      const localTime = moment
        .utc(entry.dt_txt)
        .tz("America/Regina")
        .format("YYYY-MM-DD HH:mm:ss");
      return {
        date: localTime,
        temperature: entry.main.temp,
        feels_like: entry.main.feels_like,
        temp_min: entry.main.temp_min,
        temp_max: entry.main.temp_max,
        pressure: entry.main.pressure,
        humidity: entry.main.humidity,
        weather: entry.weather[0].description,
        wind_speed: entry.wind.speed,
        visibility: entry.visibility,
        city_name: weather.city.name,
        sun_rise: moment
          .unix(weather.city.sunrise)
          .tz("America/Regina")
          .format("YYYY-MM-DD HH:mm:ss"),
        sun_set: moment
          .unix(weather.city.sunset)
          .tz("America/Regina")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
    });

    return processedData;
  } catch (error) {
    console.error("Error: " + error);
    return null;
  }
}

module.exports = fetchWeatherData;
