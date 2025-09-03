import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, follow, unfollow, searchUsers } from '../controllers/user.controller.js';

const router = Router();

router.get('/search', protect, searchUsers);
router.get('/:username', protect, getProfile);
router.post('/follow/:id', protect, follow);
router.post('/unfollow/:id', protect, unfollow);

export default router;
