import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY

  const [weather, setWeather] = useState({})

  // Fetch new weather content whenever the city changes
  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + city)
      .then(response => {
        setWeather(response.data)
      })
  }, [city])

  if (weather && weather.current) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        Temperature: {weather.current.temperature} Celcius<br />
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} /><br />
        Wind: {weather.current.wind_speed} {weather.current.wind_dir}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default Weather