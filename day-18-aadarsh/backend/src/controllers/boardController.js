import { Board } from '../models/Board.js';
import { List } from '../models/List.js';
import { Card } from '../models/Card.js';

export const createBoard = async (req, res) => {
  const board = await Board.create({ name: req.body.name, owner: req.user._id, members: [req.user._id] });
  res.status(201).json(board);
};

export const getBoards = async (req, res) => {
  const boards = await Board.find({ members: req.user._id }).sort('-updatedAt');
  res.json(boards);
};

export const getBoard = async (req, res) => {
  const board = await Board.findById(req.params.id).populate('members', 'name email');
  if(!board) return res.status(404).json({ message: 'Board not found' });
  res.json(board);
};

export const inviteMember = async (req, res) => {
  const board = await Board.findById(req.params.id);
  if(!board) return res.status(404).json({ message: 'Board not found' });
  if(String(board.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Only owner can invite' });
  if(board.members.includes(req.body.userId)) return res.status(400).json({ message: 'Already a member' });
  board.members.push(req.body.userId);
  await board.save();
  res.json(board);
};

export const deleteBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);
  if(!board) return res.status(404).json({ message: 'Board not found' });
  if(String(board.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Only owner can delete' });
  await Card.deleteMany({ list: { $in: await List.find({ board: board._id }).distinct('_id') } });
  await List.deleteMany({ board: board._id });
  await board.deleteOne();
  res.json({ message: 'Board deleted' });
};
