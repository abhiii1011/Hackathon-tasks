import React from 'react';

export default function ForecastCard({ item }) {
  const date = new Date(item.dt * 1000);
  return (
    <div className="forecast-card">
      <h4>{date.toLocaleDateString(undefined, { weekday: 'short' })}</h4>
      <p className="temp-small">{Math.round(item.main.temp)}°C</p>
      <p>{item.weather?.[0]?.main}</p>
    </div>
  );
}
