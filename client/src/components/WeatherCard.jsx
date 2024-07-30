import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function WeatherCard({ coord }) {
  const [data, setData] = useState([]);

  // capital first letter
  function capitalize(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  async function fetchWeather(location) {
    try {
      const response = await axios.post(
        "http://localhost:3001/weather",
        location
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (coord.lat && coord.lon) {
      fetchWeather(coord);
    }
  }, [coord]);

  return (
    <div>
      {data.map((info, index) => (
        <div key={index} style={{ background: "#77E4C8" }}>
          <h1>City: {info.city_name}</h1>
          <h1>Date: {info.date}</h1>
          <h1>Current Temperature: {info.temperature}°C</h1>
          <h1>Feels Like: {info.feels_like}°C</h1>
          <h1>Max Temperature: {info.temp_max}°C</h1>
          <h1>Min Temperature: {info.temp_min}°C</h1>
          <h1>Humidity: {info.humidity}%</h1>
          <h1>Pressure: {info.pressure / 10} kPa</h1>
          <h1>Visibility: {info.visibility / 1000} km</h1>
          <h1>Clouds: {capitalize(info.weather)}</h1>
          <h1>Wind Speed: {info.wind_speed} m/s</h1>
          {index == 0 && (
            <div>
              <h1>Sun Rise {info.sun_rise}</h1>
              <h1>Sun Set {info.sun_set}</h1>
            </div>
          )}
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default WeatherCard;
