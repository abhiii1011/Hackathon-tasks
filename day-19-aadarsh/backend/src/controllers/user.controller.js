import User from '../models/User.js';

export async function getProfile(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (e) { next(e); }
}

export async function follow(req, res, next) {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (target._id.equals(req.user._id)) return res.status(400).json({ message: 'Cannot follow yourself' });
    if (!target.followers.includes(req.user._id)) {
      target.followers.push(req.user._id);
      await target.save();
    }
    if (!req.user.following.includes(target._id)) {
      req.user.following.push(target._id);
      await req.user.save();
    }
    res.json({ message: 'Followed', targetId: target._id });
  } catch (e) { next(e); }
}

export async function unfollow(req, res, next) {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    target.followers = target.followers.filter(f => !f.equals(req.user._id));
    req.user.following = req.user.following.filter(f => !f.equals(target._id));
    await target.save();
    await req.user.save();
    res.json({ message: 'Unfollowed', targetId: target._id });
  } catch (e) { next(e); }
}

export async function searchUsers(req, res, next) {
  try {
    const q = req.query.q || '';
    const users = await User.find({ username: { $regex: q, $options: 'i' } }).limit(10).select('username name avatarUrl');
    res.json({ users });
  } catch (e) { next(e); }
}
