import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCity,
  setWeatherData,
  setForecastData,
  setError,
} from './weatherSlice';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { city, weatherData, forecastData, error } = useSelector(
    (state) => state.weather
  );

  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(''));
    dispatch(setWeatherData(null));
    dispatch(setForecastData([]));

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!weatherResponse.ok) throw new Error('City not found');
      const weather = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) throw new Error('City not found');
      const forecast = await forecastResponse.json();

      dispatch(
        setWeatherData({
          name: weather.name,
          description: weather.weather[0].description,
          temperature: `${Math.round(weather.main.temp)} °C`,
        })
      );

      const dailyForecast = forecast.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      );

      dispatch(
        setForecastData(
          dailyForecast.map((day) => ({
            date: new Date(day.dt_txt).toLocaleDateString(),
            temp: `${Math.round(day.main.temp)} °C`,
            description: day.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
          }))
        )
      );
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/img.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          width: '90%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
            placeholder="Enter city name"
            required
            style={{
              padding: '10px',
              marginRight: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Get Weather
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weatherData && (
          <div>
            <h2>
              Current Weather in <strong>{weatherData.name}</strong>
            </h2>
            <p>{weatherData.description}</p>
            <p>{weatherData.temperature}</p>
          </div>
        )}
        {forecastData.length > 0 && (
          <div>
            <h2>5-Day Forecast</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '10px',
              }}
            >
              {forecastData.map((day, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#E3F2FD',
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                >
                  <h3>{day.date}</h3>
                  <img src={day.icon} alt={day.description} />
                  <p>{day.description}</p>
                  <p>{day.temp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
