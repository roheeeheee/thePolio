// backend/server.js
require('dotenv').config(); // Load .env variables FIRST
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import your database connection
const connectDB = require('./config/db');

// Import all your routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Connect to MongoDB Atlas
connectDB(); 

// ── Middleware ─────────────────────────────────────────────────

// Allow React (port 3000) AND your live Vercel app to call this server
app.use(cors({ 
  origin: [
    'http://localhost:3000', 
    'https://thefolio.vercel.app' 
  ], 
  credentials: true 
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Serve uploaded image files as public URLs 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ── Start Server ──────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});