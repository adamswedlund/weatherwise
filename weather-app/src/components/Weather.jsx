// eslint-disable-next-line no-unused-vars
import React from "react"
import "./Weather.css"
import { FaSearch } from 'react-icons/fa';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Search'/>
            <div className="icon-container">
            <FaSearch className="search-icon" />
            </div>
        </div>
        <img src={clear_icon} alt="" className='weather-icon'/>
        <p className='tempature'> 32°F </p>
        <p className='location'>Wausau</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" />
            </div>
            <div>
                <p>91 %</p>
                <span>Humidity</span>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="" />
            </div>
            <div>
                <p>7 mph</p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
  )
}

export default Weather