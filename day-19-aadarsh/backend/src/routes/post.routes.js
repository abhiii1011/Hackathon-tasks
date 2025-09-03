import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createPost, getFeed, getPost, likePost, unlikePost, addComment, listComments } from '../controllers/post.controller.js';

const router = Router();

router.get('/feed', protect, getFeed);
router.post('/', protect, createPost);
router.get('/:id', protect, getPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/unlike', protect, unlikePost);
router.post('/:id/comments', protect, addComment);
router.get('/:id/comments', protect, listComments);

export default router;
