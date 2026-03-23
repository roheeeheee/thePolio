const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// ==========================================
// 🚦 INLINE WRAPPERS (Bulletproof against export errors)
// ==========================================

const authMid = require('../middleware/auth.middleware');
const protect = (req, res, next) => {
  if (authMid && typeof authMid.protect === 'function') return authMid.protect(req, res, next);
  return res.status(500).json({ message: "Server error: Auth middleware missing." });
};

const roleMid = require('../middleware/role.middleware');
const memberOrAdmin = (req, res, next) => {
  if (roleMid && typeof roleMid.memberOrAdmin === 'function') return roleMid.memberOrAdmin(req, res, next);
  return res.status(500).json({ message: "Server error: Role middleware missing." });
};

// ==========================================
// 🚀 COMMENT ROUTES
// ==========================================

/**
 * @route   GET /api/comments/:postId
 * @desc    Get comments for a specific post
 * @access  Public
 */
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name profilePic')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/comments
 * @desc    Create a new comment
 * @access  Protected (Member or Admin)
 */
router.post('/', protect, memberOrAdmin, async (req, res) => {
  try {
    const { body, postId } = req.body;

    if (!body || !postId) {
      return res.status(400).json({ message: "Body and PostId are required" });
    }

    const comment = await Comment.create({
      body,
      post: postId,
      author: req.user._id // req.user is attached by the protect middleware
    });

    // Populate author info before sending back
    await comment.populate('author', 'name profilePic');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/comments/:id
 * @desc    Delete a comment
 * @access  Owner or Admin
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Authorization: Only the original author or an admin can delete
    const isAuthor = comment.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;