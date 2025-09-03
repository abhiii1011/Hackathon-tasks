import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import boardRoutes from './routes/boardRoutes.js';

dotenv.config();
await connectDB();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
if(process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/', (_, res) => res.send('API running'));
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', socket => {
  socket.on('join-board', boardId => socket.join(boardId));
  socket.on('card-updated', ({ boardId, card }) => {
    socket.to(boardId).emit('card-updated', card);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log('Server listening on ' + PORT));
