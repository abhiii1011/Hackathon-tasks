import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  position: { type: Number, default: 0 },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dueDate: Date,
  labels: [{ type: String }]
}, { timestamps: true });

export const Card = mongoose.model('Card', cardSchema);
