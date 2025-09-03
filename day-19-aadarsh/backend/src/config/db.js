import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/day19social';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || undefined });
  console.log('MongoDB connected');
}
