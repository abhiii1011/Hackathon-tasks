import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ message: 'Username or email already in use' });
    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7*24*3600*1000 });
    res.status(201).json({ user: { id: user._id, username: user.username, email: user.email }, token });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7*24*3600*1000 });
    res.json({ user: { id: user._id, username: user.username, email: user.email }, token });
  } catch (e) { next(e); }
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}

export function me(req, res) {
  res.json({ user: req.user });
}
