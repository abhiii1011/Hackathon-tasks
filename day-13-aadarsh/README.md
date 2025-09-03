# Day 13 - Basic Notes App

A super simple full-stack Notes application built with:

- Backend: Express (in-memory storage)
- Frontend: Vanilla HTML/CSS/JS (fetch API)

## Features
- Create notes (title + content)
- List all notes (newest first)
- Edit note title and content inline then save
- Delete single note
- Clear all notes
- Filter notes client-side

## Project Structure
```
backend/  # Express server (CRUD API)
frontend/ # Static single-page app
```

## API Endpoints
| Method | Path | Description |
| ------ | ---- | ----------- |
| GET    | /api/notes | List all notes |
| POST   | /api/notes | Create note (title, content) |
| GET    | /api/notes/:id | Get single note |
| PUT    | /api/notes/:id | Update note (title/content) |
| DELETE | /api/notes/:id | Delete one note |
| DELETE | /api/notes | Delete all notes |

Notes are stored only in memory (they reset when the server restarts).

## Run Backend
From `day-13/backend`:
```
npm install
npm start
```
Server runs at: http://localhost:4000

## Run Frontend
Just open the `frontend/index.html` file in a browser (it calls the backend API).
On macOS you can also serve it quickly:
```
python3 -m http.server 5173 --directory frontend
```
Then open: http://localhost:5173

(Or simply double-click the HTML file.)

## Environment Notes
No database is used. To persist data, you could later add a JSON file store or connect MongoDB / SQLite.

## Next Ideas
- Add localStorage cache
- Add pagination
- Add user auth
- Replace in-memory with a DB
- Add markdown support

Enjoy!
