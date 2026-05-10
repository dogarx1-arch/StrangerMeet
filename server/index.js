const express = require('express')
const http = require('http')
const cors = require('cors')
const connectDB = require('./config/db')
const env = require('./config/env')
const attachSocket = require('./socket/index')

// Import routes
const statsRoute = require('./routes/stats')
const reportRoute = require('./routes/report')

// 1. Connect MongoDB
connectDB()

// 2. Create Express app
const app = express()

app.use(cors({
  origin: env.CLIENT_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(express.json())

// 3. Mount routes
app.use('/api/stats', statsRoute)
app.use('/api/report', reportRoute)

// 4. Create HTTP server and attach Socket.io
const server = http.createServer(app)
attachSocket(server)

// 5. Listen
server.listen(env.PORT, () => {
  console.log(`[server] Running on port ${env.PORT}`)
  console.log(`[server] Accepting CORS from ${env.CLIENT_ORIGIN}`)
})
