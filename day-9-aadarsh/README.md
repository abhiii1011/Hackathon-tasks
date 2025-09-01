# Day 9 - Student Directory (Full Stack Mini App)

A very basic full-stack project with:
- Backend: Express server offering an in-memory Student Directory API.
- Frontend: React (Vite) single-page interface to list, add, update, and delete students.

This is intentionally minimal: no database, no auth, purely in-memory store (resets on server restart).

## Data Shape
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "cohort": "2025"
}
```

## Backend
Folder: `backend`
Endpoints:
- GET /api/students -> list all
- POST /api/students { name, email, cohort } -> create
- GET /api/students/:id -> single
- PUT /api/students/:id { name, email, cohort } -> update
- DELETE /api/students/:id -> remove

Port: 4000 (override with PORT env var).

## Frontend
Folder: `frontend`
Features:
- Display student list
- Add new student
- Inline edit (click edit button)
- Delete student
- Simple client-side validation

The frontend uses a Vite dev server with a proxy so that requests to `/api` are forwarded to the backend—no manual CORS handling needed in development.

## Quick Start
In two terminals:

Backend:
```
cd backend
npm install
npm run dev
```

Frontend:
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Build Frontend (optional)
```
cd frontend
npm run build
npm run preview
```

## Next Ideas (Not Implemented Yet)
- Persist via a real database or a JSON file
- Pagination & search
- Form validation library / schema (e.g. Zod)
- UI library styling
- Tests (Jest / Vitest + supertest)

Enjoy exploring the fundamentals!
