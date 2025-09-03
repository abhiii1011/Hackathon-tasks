import { Card } from '../models/Card.js';
import { List } from '../models/List.js';

export const createCard = async (req, res) => {
  const { title, description } = req.body;
  const cardCount = await Card.countDocuments({ list: req.params.listId });
  const card = await Card.create({ title, description, list: req.params.listId, position: cardCount });
  res.status(201).json(card);
};

export const getCards = async (req, res) => {
  const cards = await Card.find({ list: req.params.listId }).sort('position');
  res.json(cards);
};

export const moveCard = async (req, res) => {
  const { cardId, toListId, toPosition } = req.body;
  const card = await Card.findById(cardId);
  if(!card) return res.status(404).json({ message: 'Card not found' });

  // shift positions in source list
  await Card.updateMany({ list: card.list, position: { $gt: card.position } }, { $inc: { position: -1 } });

  // shift positions in target list
  await Card.updateMany({ list: toListId, position: { $gte: toPosition } }, { $inc: { position: 1 } });

  card.list = toListId;
  card.position = toPosition;
  await card.save();
  res.json(card);
};
