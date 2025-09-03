# Trello-like Project Management (Day 18)

A minimal Trello-style kanban board built with the MERN stack + Socket.io for realtime card movement broadcast.

## Features
- User auth (register/login/JWT/me)
- Boards (create/list/view/delete, invite members)
- Lists per board (create, reorder)
- Cards per list (create, drag and drop move across lists)
- Realtime card updates via websockets

## Tech
Backend: Express, MongoDB (Mongoose), JWT, socket.io
Frontend: React (Vite), Context API, axios, socket.io-client

## Getting Started
### Backend
1. Copy `.env.example` to `.env` and adjust if needed.
2. Install deps: `npm install`
3. Run dev: `npm run dev`

### Frontend
1. Install deps: `npm install`
2. Run dev: `npm run dev`

Frontend dev server default: http://localhost:5174
API base: http://localhost:5000/api

Optionally set `VITE_API_URL` in a `frontend/.env` for different API URL.

## API Overview
- POST /api/auth/register { name,email,password }
- POST /api/auth/login { email,password }
- GET /api/auth/me
- GET /api/boards
- POST /api/boards { name }
- GET /api/boards/:id
- POST /api/boards/:id/invite { userId }
- DELETE /api/boards/:id
- POST /api/boards/:boardId/lists { title }
- GET /api/boards/:boardId/lists
- PUT /api/boards/:boardId/lists/reorder { orderedIds: [] }
- POST /api/boards/lists/:listId/cards { title, description? }
- GET /api/boards/lists/:listId/cards
- PUT /api/boards/lists/:listId/cards/move { cardId, toListId, toPosition }

## Improvements / Next Steps
- Validation & ownership checks for every entity
- Better error handling & 404s
- Delete/update cards & lists
- Label management, comments, activity log
- Optimistic UI + refined drag and drop (e.g. react-beautiful-dnd)
- Tests (Jest + supertest)
- Production build & dockerization

Enjoy!
