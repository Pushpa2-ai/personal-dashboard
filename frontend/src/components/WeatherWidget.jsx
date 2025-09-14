// src/components/WeatherCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "af34049a6ae9a19c7511a6a40f85fe23"; // replace with your API key
        const city = "Delhi"; // fixed city, or you can detect via location
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = response.data;
        setWeather({
          temp: data.main.temp,
          icon: data.weather[0].icon,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      {weather ? (
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="Weather Icon"
            className="w-16 h-16"
          />
          <p className="text-2xl font-bold">{weather.temp}°C</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default WeatherCard;
