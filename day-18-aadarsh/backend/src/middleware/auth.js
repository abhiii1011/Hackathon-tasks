import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if(!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = await User.findById(payload.id).select('-password');
    if(!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
