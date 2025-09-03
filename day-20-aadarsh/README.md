# Day 20 – MERN Weather Forecast App

Full‑stack MERN weather application with:

* Current weather & 5‑day / 3‑hour forecast (OpenWeatherMap)
* Search by city name
* Automatic browser geolocation (with user permission)
* Backend proxy (hides API key) + light in‑memory caching
* Graceful error states & loading indicators

## Stack
Backend: Node.js, Express, dotenv, axios, cors  
Frontend: React (Vite), fetch/axios  
Testing (backend): Jest + Supertest (only validating parameter errors to avoid real API calls during tests)

## Folder Structure
```
day-20-aadarsh/
  backend/
    server.js
    package.json
    routes/weather.js
    controllers/weatherController.js
    utils/fetchWeather.js
    utils/cache.js
    .env.example
  frontend/
    index.html
    package.json
    vite.config.js
    src/
      main.jsx
      App.jsx
      components/
        SearchBar.jsx
        ForecastCard.jsx
      hooks/
        useGeolocation.js
      services/
        api.js
      styles.css
  README.md
```

## Quick Start

### 1. Backend
```
cd backend
cp .env.example .env   # add your OpenWeatherMap API key
npm install
npm run dev
```
Server runs on http://localhost:5000

### 2. Frontend
```
cd frontend
npm install
npm run dev
```
App runs on http://localhost:5173 (default Vite port) and proxies API calls to backend.

## Environment Variables (backend/.env)
```
PORT=5000
OPENWeather_API_BASE=https://api.openweathermap.org/data/2.5
OPENWEATHER_API_KEY=REPLACE_WITH_YOUR_KEY
CACHE_TTL_SECONDS=600
```

## API Endpoints (Backend)
Base: `/api/weather`

* `GET /api/weather/current?city=London` – current weather by city
* `GET /api/weather/current?lat=..&lon=..` – current weather by coordinates
* `GET /api/weather/forecast?city=London` – 5‑day / 3‑hour forecast by city
* `GET /api/weather/forecast?lat=..&lon=..` – forecast by coordinates

Query must include either `city` or both `lat` & `lon`.

## Caching
Simple in‑memory cache keyed by normalized request parameters. TTL configurable via `CACHE_TTL_SECONDS`.

## Future Enhancements
* Persistent cache (Redis)
* Unit tests for fetch logic with mocked HTTP
* UI theme toggle & graph visualizations
* Offline fallback (Service Worker)

## License
Educational/demo use.
