const { fetchCurrentWeather, fetchForecast } = require('../utils/fetchWeather');

function validateParams(req, res) {
  const { city, lat, lon } = req.query;
  if (city) return { city };
  if (lat && lon) return { lat, lon };
  res.status(400).json({ error: 'Provide either ?city=Name or both ?lat=..&lon=..' });
  return null;
}

exports.getCurrentWeather = async (req, res, next) => {
  try {
    const params = validateParams(req, res);
    if (!params) return; // response already sent
    const data = await fetchCurrentWeather(params);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.getForecast = async (req, res, next) => {
  try {
    const params = validateParams(req, res);
    if (!params) return;
    const data = await fetchForecast(params);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
