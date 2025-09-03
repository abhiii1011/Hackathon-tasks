import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles.includes(role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
