async function handle(resp) {
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || resp.statusText);
  }
  return resp.json();
}

export function getCurrentWeather(params) {
  const query = new URLSearchParams(params).toString();
  return fetch(`/api/weather/current?${query}`).then(handle);
}

export function getForecast(params) {
  const query = new URLSearchParams(params).toString();
  return fetch(`/api/weather/forecast?${query}`).then(handle);
}
