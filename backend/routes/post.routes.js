const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 1. Safe Protect Middleware
const authMid = require('../middleware/auth.middleware');
const protect = (req, res, next) => {
  if (authMid && typeof authMid.protect === 'function') return authMid.protect(req, res, next);
  return res.status(500).json({ message: "Server error: Auth middleware missing." });
};

// 2. Safe Role Middleware
const roleMid = require('../middleware/role.middleware');
const memberOrAdmin = (req, res, next) => {
  if (roleMid && typeof roleMid.memberOrAdmin === 'function') return roleMid.memberOrAdmin(req, res, next);
  return res.status(500).json({ message: "Server error: Role middleware missing." });
};

// 3. Safe Upload Middleware
const uploadMid = require('../middleware/upload.middleware');
const uploadImage = (req, res, next) => {
  if (uploadMid && typeof uploadMid.single === 'function') {
    return uploadMid.single('image')(req, res, next);
  }
  return res.status(500).json({ message: "Server error: Upload middleware missing." });
};

// ==========================================
// 🚀 POST ROUTES
// ==========================================

/**
 * @route   POST /api/posts
 */
router.post('/', protect, memberOrAdmin, uploadImage, async (req, res) => {
  try {
    const { title, body } = req.body;
    const image = req.file ? req.file.filename : '';
    
    const post = await Post.create({ 
      title, 
      body, 
      image, 
      author: req.user._id 
    });
    
    await post.populate('author', 'name profilePic');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/posts
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'name profilePic')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PUT /api/posts/:id
 */
router.put('/:id', protect, memberOrAdmin, uploadImage, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.body) post.body = req.body.body;
    if (req.file) post.image = req.file.filename;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/posts/:id
 */
router.delete('/:id', protect, memberOrAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;