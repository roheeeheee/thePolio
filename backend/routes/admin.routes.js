const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

const authMid = require('../middleware/auth.middleware');
const protect = (req, res, next) => {
  if (authMid && typeof authMid.protect === 'function') return authMid.protect(req, res, next);
  return res.status(500).json({ message: "Server error: Auth middleware missing." });
};

const roleMid = require('../middleware/role.middleware');
const adminOnly = (req, res, next) => {
  if (roleMid && typeof roleMid.adminOnly === 'function') return roleMid.adminOnly(req, res, next);
  return res.status(500).json({ message: "Server error: Role middleware missing." });
};

// Apply protection and admin check to ALL routes in this file
router.use(protect, adminOnly);

// GET /api/admin/users — List all non-admin members
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT /api/admin/users/:id/status — Toggle member active/inactive
router.put('/users/:id/status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role === 'admin')
      return res.status(404).json({ message: 'User not found' });
    
    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();
    res.json({ message: `User is now ${user.status}`, user });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/admin/posts — List ALL posts including removed ones
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;