# Shivam Sagar — MERN Portfolio

Editorial, warm, paper-inspired full-stack portfolio built with React/Vite/Tailwind on the client and Node/Express/MongoDB on the server.

## Requirements

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

## Setup

### Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### Windows PowerShell

If `cp` is unavailable:

```powershell
Copy-Item .env.example .env
```

## Project data architecture

Project content has one source of truth:

```text
shared/projects.js
       │
       ├── client/src/data/constants.js
       │       └── portfolio UI fallback
       │
       └── server/utils/seed.js
               └── MongoDB seed
```

The frontend requests project data from `GET /api/projects`. If the API is unavailable, the same shared project data remains available as a local fallback so the portfolio can still render.

After changing project data, run the seed command again to synchronize MongoDB:

```bash
cd server
npm run seed
```

## API

### Projects

- `GET /api/projects` — list public projects
- `GET /api/projects/:slug` — get one public project

Project creation, update, and deletion are intentionally not public API operations.

### Messages

- `POST /api/messages` — submit the public contact form

The contact endpoint is limited to 3 submissions per 10 minutes per IP.

### Stats

- `GET /api/stats` — read public portfolio statistics
- `POST /api/stats/view` — increment the public view counter

## Environment

Server `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shivam-portfolio
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

For production, set `CLIENT_ORIGIN` to the deployed frontend origin and use a production MongoDB URI.

Client environment:

```env
VITE_API_URL=http://localhost:5000
```

When the frontend and backend share an origin, `VITE_API_URL` can be left empty.

## Architecture

```text
shivam-portfolio/
├── shared/
│   └── projects.js          # canonical project content
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── client/
    └── src/
        ├── api/
        ├── components/
        │   ├── layout/
        │   ├── logos/
        │   ├── sections/
        │   └── ui/
        ├── context/
        └── data/
```

## Development workflow

1. Update project content in `shared/projects.js`.
2. Run `npm run seed` from `server/` when MongoDB-backed project data needs updating.
3. Run the frontend and backend locally.
4. Verify the project list through `GET /api/projects` and the portfolio UI.

