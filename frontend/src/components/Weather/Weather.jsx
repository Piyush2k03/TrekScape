// src/components/Weather/Weather.jsx
import React, { useState, useEffect } from 'react';
import './weather.css';
import { BASE_URL } from '../../utils/config';

const Weather = ({ location, fallbackLocation }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                setError(null);
                
                let res = await fetch(`${BASE_URL}/weather/${encodeURIComponent(location)}`);
                let result = await res.json();

                // Fallback if the first location is not recognized by the API
                if (!res.ok && fallbackLocation) {
                    res = await fetch(`${BASE_URL}/weather/${encodeURIComponent(fallbackLocation)}`);
                    result = await res.json();
                }

                if (!res.ok) {
                    throw new Error(result.message || 'Failed to fetch weather');
                }

                if (result.success) {
                    setWeatherData(result.data);
                } else {
                    throw new Error(result.message || 'Failed to load weather');
                }
            } catch (err) {
                console.error("Weather hook error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    if (!location) return null;

    if (loading) {
        return (
            <div className="weather-loading">
                <i className="ri-loader-4-line ri-spin"></i> Loading weather...
            </div>
        );
    }

    if (error) {
        return (
            <div className="weather-error">
                <i className="ri-error-warning-line"></i> Weather unavailable
            </div>
        );
    }

    if (!weatherData) return null;

    return (
        <div className="weather-widget">
            <div className="weather-icon-container">
                <img 
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
                    alt={weatherData.description} 
                />
            </div>
            <div className="weather-info">
                <h4 className="weather-temp">{weatherData.temp}°C</h4>
                <p className="weather-condition">{weatherData.description}</p>
                <div className="weather-location">
                    <i className="ri-map-pin-2-line"></i> {weatherData.city}
                </div>
            </div>
        </div>
    );
};

export default Weather;
