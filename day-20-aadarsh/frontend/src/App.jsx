import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import ForecastCard from './components/ForecastCard.jsx';
import useGeolocation from './hooks/useGeolocation.js';
import { getCurrentWeather, getForecast } from './services/api.js';

export default function App() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const geo = useGeolocation();

  async function loadByParams(params) {
    try {
      setError('');
      setLoading(true);
      const [c, f] = await Promise.all([
        getCurrentWeather(params),
        getForecast(params)
      ]);
      setCurrent(c);
      // pick every 8th (24h) or first 5 items if less
      const simplified = f.list ? f.list.filter((_, i) => i % 8 === 0).slice(0,5) : [];
      setForecast(simplified);
    } catch (e) {
      setError(e.message || 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (geo.coords && !geo.error && !current) {
      loadByParams({ lat: geo.coords.latitude, lon: geo.coords.longitude });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.coords]);

  function handleSearch(city) {
    loadByParams({ city });
  }

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {geo.error && <p className="warn">Geolocation error: {geo.error}</p>}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {current && !loading && (
        <div className="current">
          <h2>{current.name}</h2>
          <p className="temp">{Math.round(current.main.temp)}°C</p>
          <p>{current.weather?.[0]?.description}</p>
          <p>Humidity: {current.main.humidity}% | Wind: {current.wind.speed} m/s</p>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="forecast-grid">
          {forecast.map(item => <ForecastCard key={item.dt} item={item} />)}
        </div>
      )}
    </div>
  );
}
