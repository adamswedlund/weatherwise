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
import rainy_icon from "../assets/rainy.png";

const Weather = () => {
  const [city, setCity] = useState(""); // city 
  const [weather, setWeather] = useState(null); // weather data
  const [precipitationChance, setPrecipitationChance] = useState(null); // percipitation chance

  const search = async (city) => {
    // Handles invalid entries for city.
    if (!city || city.trim() === "") {
      alert("Please enter a valid city name.");
      return;
    }

    try {
      const apiKey = "f65feb46406092d8582d2721ce5a316e";
      const encodedCity = encodeURIComponent(city.trim()); 
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=imperial`;

      // Retrieve the current weather data from Open Weather
      const currentResponse = await fetch(currentWeatherUrl);
      const currentData = await currentResponse.json();

      if (currentResponse.status !== 200) {
        console.error(`Error: ${currentData.message}`);
        alert(currentData.message); 
        return;
      }
    
      // Set current weather
      setWeather(currentData); 

      // Get latitude and longitude for the One Call API in Open Weather
      const { lat, lon } = currentData.coord;
      const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;

      // Retrieve the weather data from One Call API
      const oneCallResponse = await fetch(oneCallUrl);
      const oneCallData = await oneCallResponse.json();

      if (oneCallResponse.status === 200) {
        setPrecipitationChance(Math.round(oneCallData.daily[0].pop * 100)); // Precipitation chance in %
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  // Default of Milwaukee
  useEffect(() => {
    search("Milwaukee");
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
            if (e.key === "Enter") search(city); //can utilize the enter key for search
          }}
        />
        <div className="icon-container" onClick={() => search(city)}>
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
              <img src={rainy_icon} alt="Precipitation Icon" />
              <div>
                <p>
                  {precipitationChance !== null
                    ? `${precipitationChance} %`
                    : "0% "}
                </p>
                <span>Precipitation</span>
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