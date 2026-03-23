const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: 'user' },
  // ADD THESE FIELDS if they match your form!
  identity: { type: String }, 
  clearance: { type: String },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);