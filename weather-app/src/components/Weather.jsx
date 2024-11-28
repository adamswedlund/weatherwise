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

  const states = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
    HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
    MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
    NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
    ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
    RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
    TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
    WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  };

  // Add lowercase versions for case-insensitive matching
  Object.keys(states).forEach((key) => {
    states[key.toLowerCase()] = states[key];
    states[states[key].toLowerCase()] = states[key];
  });

  const normalInput = (input) => {
    const parts = input.trim().split(",").map((part) => part.trim());
    if (parts.length > 1 && states[parts[1].toLowerCase()]) {
      parts[1] = states[parts[1].toLowerCase()]; 
    } else if (states[parts[0].toLowerCase()]) {
      return states[parts[0].toLowerCase()]; 
    }
    return parts.join(", ");
  };

  const citySearch = async (input) => {
    const normalizedCity = normalInput(input);

    if (!normalizedCity || normalizedCity.trim() === "") {
      alert("Please enter a valid city name. Ex. Milwaukee -- Milwaukee, WI -- Milwaukee, Wisconsin");
      return;
    }

    try {
      const apiKey = "f65feb46406092d8582d2721ce5a316e"; // Replace with environment variable in production
      const City = encodeURIComponent(normalizedCity.trim());
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
          onChange={(e) => setCity(e.target.value)} // Set entered city
          onKeyDown={(e) => {
            if (e.key === "Enter") citySearch(city); // Trigger search on Enter key
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

          {/* Setting Image for Weather Data */}
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