const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/weather', require('./routes/weather'));

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err); // eslint-disable-line no-console
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Weather backend running on port ${PORT}`); // eslint-disable-line no-console
  });
}

module.exports = app; // exported for tests
