import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export async function createPost(req, res, next) {
  try {
    const { content, images } = req.body;
    const post = await Post.create({ author: req.user._id, content, images });
    res.status(201).json({ post });
  } catch (e) { next(e); }
}

export async function getFeed(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const followingIds = [...req.user.following, req.user._id];
    const posts = await Post.find({ author: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username avatarUrl');
    res.json({ posts, page });
  } catch (e) { next(e); }
}

export async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username avatarUrl');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (e) { next(e); }
}

export async function likePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      post.likeCount = post.likes.length;
      await post.save();
    }
    res.json({ likeCount: post.likeCount });
  } catch (e) { next(e); }
}

export async function unlikePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.likes = post.likes.filter(l => !l.equals(req.user._id));
    post.likeCount = post.likes.length;
    await post.save();
    res.json({ likeCount: post.likeCount });
  } catch (e) { next(e); }
}

export async function addComment(req, res, next) {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ post: post._id, author: req.user._id, content });
    post.commentCount += 1;
    await post.save();
    res.status(201).json({ comment });
  } catch (e) { next(e); }
}

export async function listComments(req, res, next) {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('author', 'username avatarUrl');
    res.json({ comments });
  } catch (e) { next(e); }
}
