import { List } from '../models/List.js';

export const createList = async (req, res) => {
  const { title } = req.body;
  const listCount = await List.countDocuments({ board: req.params.boardId });
  const list = await List.create({ title, board: req.params.boardId, position: listCount });
  res.status(201).json(list);
};

export const getLists = async (req, res) => {
  const lists = await List.find({ board: req.params.boardId }).sort('position');
  res.json(lists);
};

export const reorderLists = async (req, res) => {
  const { orderedIds } = req.body; // array of list ids in new order
  await Promise.all(orderedIds.map((id, idx) => List.findByIdAndUpdate(id, { position: idx })));
  res.json({ message: 'Reordered' });
};
