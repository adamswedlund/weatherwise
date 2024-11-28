import { useState, useEffect } from "react";
import "./Weather.css";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import temp_icon from "../assets/temp.png";

const Weather = () => {
  const [city, setCity] = useState(""); // City input
  const [weather, setWeather] = useState(null); // Weather data

  const citySearch = async (city) => {
    if (!city || city.trim() === "") {
      alert("Please enter a valid city name.");
      return;
    }

    try {
      const apiKey = "f65feb46406092d8582d2721ce5a316e";
      const City = encodeURIComponent(city.trim());
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=imperial`;

      const response = await fetch(currentWeatherUrl);
      const data = await response.json();

      if (response.status !== 200) {
        console.error(`Error: ${data.message}`);
        alert(data.message);
        return;
      }

      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  // Default city to Milwaukee
  useEffect(() => {
    citySearch("Milwaukee");
  }, []);

  return (
    <div className="weather">
      {/* Heading Section */}
      <div className="header">
        <h1 className="weather-wise">WeatherWise</h1>
        <FaBars className="hamburger-icon" />
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)} //set entered city
          onKeyDown={(e) => {
            if (e.key === "Enter") citySearch(city); //can utilize the enter key for search
          }}
        />
        <div className="icon-container" onClick={() => citySearch(city)}>
          <FaSearch className="search-icon" />
        </div>
      </div>

      {/* General Weather Information */}
      {weather ? (
        <>
          <p className="location">{weather.name}</p>
          <p className="tempature">{Math.round(weather.main.temp)}°F</p>

          {/* Setting Image for Weather Data*/}
          <img
            src={
              weather.weather[0].main === "Clear"
                ? clear_icon
                : weather.weather[0].main === "Clouds"
                ? cloud_icon
                : weather.weather[0].main === "Rain"
                ? rain_icon
                : weather.weather[0].main === "Snow"
                ? snow_icon
                : drizzle_icon
            }
            alt="Weather Icon"
            className="weather-icon"
          />

          {/* Weather Data Set */}
          <div className="weather-data">
            <div className="col">
              <img src={temp_icon} alt="Temp Icon" />
              <div>
                <p>{Math.round(weather.main.feels_like)}°F</p>
                <span>Feels Like</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weather.wind.speed} mph</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="loading-message">Enter a city to see the weather.</p>
      )}
    </div>
  );
};

export default Weather;
