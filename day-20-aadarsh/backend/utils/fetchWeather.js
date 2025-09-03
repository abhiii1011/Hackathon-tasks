const axios = require('axios');
const cache = require('./cache');

const BASE = process.env.OPENWeather_API_BASE || 'https://api.openweathermap.org/data/2.5';
const KEY = process.env.OPENWEATHER_API_KEY || '';
const TTL = (parseInt(process.env.CACHE_TTL_SECONDS, 10) || 600) * 1000;

if (!KEY) {
  console.warn('WARNING: OPENWEATHER_API_KEY not set. API calls will fail.'); // eslint-disable-line no-console
}

function buildQuery(params) {
  if (params.city) return { q: params.city };
  return { lat: params.lat, lon: params.lon };
}

async function get(endpoint, params) {
  const queryParams = buildQuery(params);
  const key = cache.makeKey(endpoint, queryParams);
  const cached = cache.get(key);
  if (cached) return cached;
  const url = `${BASE}/${endpoint}`;
  const { data } = await axios.get(url, {
    params: { ...queryParams, appid: KEY, units: 'metric' }
  });
  cache.set(key, data, TTL);
  return data;
}

exports.fetchCurrentWeather = (params) => get('weather', params);
exports.fetchForecast = (params) => get('forecast', params);
