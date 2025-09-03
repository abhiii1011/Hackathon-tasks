import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createBoard, getBoards, getBoard, inviteMember, deleteBoard } from '../controllers/boardController.js';
import { createList, getLists, reorderLists } from '../controllers/listController.js';
import { createCard, getCards, moveCard } from '../controllers/cardController.js';

const router = Router();

// boards
router.post('/', auth, createBoard);
router.get('/', auth, getBoards);
router.get('/:id', auth, getBoard);
router.post('/:id/invite', auth, inviteMember);
router.delete('/:id', auth, deleteBoard);

// lists
router.post('/:boardId/lists', auth, createList);
router.get('/:boardId/lists', auth, getLists);
router.put('/:boardId/lists/reorder', auth, reorderLists);

// cards
router.post('/lists/:listId/cards', auth, createCard);
router.get('/lists/:listId/cards', auth, getCards);
router.put('/lists/:listId/cards/move', auth, moveCard);

export default router;
