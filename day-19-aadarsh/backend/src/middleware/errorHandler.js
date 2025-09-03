export default function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
}
