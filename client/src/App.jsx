import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coord, setCoord] = useState({});
  const [loading, setLoading] = useState(true);

  const getLocation = () => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoord({ lat: latitude, lon: longitude });
            setLoading(false);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else if (result.state === "denied") {
        window.alert("Please enable location permissions in your browser.");
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, [coord]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Getting Your Location</h1>
        </div>
      ) : (
        <WeatherCard coord={coord}></WeatherCard>
      )}
    </div>
  );
}

export default App;
