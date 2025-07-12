const mongoose = require('mongoose');
const schemaCleaner = require('../utils/schemaCleaner');

// Define the Comment schema
// It includes fields for author, body, createdAt, and updatedAt
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: { type: String, required: true, trim: true, minlength: 5 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


// Ensure the schema is cleaned up before saving
schemaCleaner(commentSchema);

module.exports = mongoose.model('Comment', commentSchema);
