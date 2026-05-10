# StrangerMeet

A fully anonymous, ephemeral 1-on-1 random chat web application. Users are randomly matched with a stranger for text chat. No accounts, no login, no message storage. Sessions vanish on disconnect. One feature only: random 1-on-1 text chat.

Built with the **Vellum Design System**.

## Tech Stack
- Frontend: Vite + React 18, Tailwind CSS, Zustand, React Router v6
- Backend: Express.js, Socket.io, MongoDB (Mongoose)
- Testing: Vitest
- DevOps: Docker Compose

## Development Setup

1. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` in the root (or in the `server` directory) and adjust if needed:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/strangermeet
   CLIENT_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

3. **Run using Docker Compose**
   ```bash
   docker-compose up --build
   ```
   * Client runs on `http://localhost:5173`
   * Server runs on `http://localhost:5000`
   * Mongo runs on `localhost:27017`

## Socket.io Event Contract

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `queue:join` | `{ anonId }` | User enters matchmaking queue |
| `queue:leave` | — | User cancels search |
| `chat:message` | `{ text, sessionId }` | Send a chat message |
| `chat:typing` | `{ sessionId }` | User is typing |
| `chat:skip` | `{ sessionId }` | Skip to next stranger |
| `chat:report` | `{ sessionId, reason }` | Report current stranger |

### Server → Client
| Event | Payload | Description |
|---|---|---|
| `session:init` | `{ anonId }` | Assign anon ID on connect |
| `queue:paired` | `{ sessionId, partnerAnonId }` | Match found, go to chat |
| `queue:waiting` | `{ position }` | Still in queue |
| `chat:message` | `{ text, from, time }` | Incoming message |
| `chat:typing` | — | Partner is typing |
| `chat:skipped` | — | Partner skipped you |
| `stats:update` | `{ onlineCount, inChatCount, waitingCount }` | Live stats |
| `matches:recent` | `[{ id1, id2, time }]` | Last 3 pairs formed |

## Testing
To run the server tests:
```bash
cd server
npm test
```

## Deployment (Render / Railway)

1. **Database:** Provision a MongoDB cluster (e.g., MongoDB Atlas).
2. **Server:** Deploy the `server/` directory as a Node.js Web Service.
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Env Vars: `MONGODB_URI`, `CLIENT_ORIGIN` (set to your frontend URL).
3. **Client:** Deploy the `client/` directory as a Static Site.
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Env Vars: ensure you configure `VITE_API_URL` if needed to point to your new backend.

*(Note: If deploying via Docker, use the provided Dockerfiles and expose the corresponding ports.)*
