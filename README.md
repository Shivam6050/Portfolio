# Shivam Sagar — MERN Portfolio

Editorial, warm, paper-inspired full-stack portfolio built with React/Vite/Tailwind on the client and Node/Express/MongoDB on the server.

## Requirements

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

## Setup

```bash
# Terminal 1 — Backend
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI (default: mongodb://localhost:27017/shivam-portfolio)
npm run seed
npm run dev

# Terminal 2 — Frontend
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### Windows PowerShell

If `cp` is unavailable, use:

```powershell
Copy-Item .env.example .env
```

## API

- `GET /api/health` (process health; does not require MongoDB)
- `GET /api/projects`
- `GET /api/projects/:slug`
- `POST /api/messages`
- `GET /api/stats`
- `POST /api/stats/view`

The contact endpoint is limited to 3 submissions per 10 minutes per IP.

## Environment

Server `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shivam-portfolio
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

For production, set `CLIENT_ORIGIN` to the deployed frontend origin and use a production MongoDB URI.

## Architecture

```text
shivam-portfolio/
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


## Production and verification

The rendered portfolio content is maintained in `client/src/data/constants.js`. The database projects API is separate; seeding it does not change the page. Seeding updates the known projects by slug and preserves other projects.

For a separately hosted backend, set `VITE_API_URL` to its origin before running `npm run build` in `client`. Vite embeds this value at build time. Without it, the frontend host must proxy `/api` to the backend; the development proxy is not included in production builds.

Run `npm test` in each package and `npm run build` in `client`.

If deploying behind a reverse proxy, configure `TRUST_PROXY_HOPS` only after verifying the proxy count and that clients cannot bypass it. Otherwise rate limits can group all visitors under the proxy IP. In-memory rate limits are per process and reset on restart; multi-instance deployments need a shared rate-limit store.

Contact submissions are stored in MongoDB; this application does not send email notifications or expose a public inbox endpoint.
