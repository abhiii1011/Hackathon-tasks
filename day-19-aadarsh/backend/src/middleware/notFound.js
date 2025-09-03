export default function notFound(req, res, next) { // eslint-disable-line
  res.status(404).json({ message: 'Route not found' });
}
