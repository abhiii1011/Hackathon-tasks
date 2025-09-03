import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, roles: user.roles },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '7d' }
  );
}
