const mongoose = require('mongoose');
const commentSchema = require('./comment').schema;
const answerSchema = require('./answer').schema;
const schemaCleaner = require('../utils/schemaCleaner');


// Define the Question schema
// It includes fields for author, title, body, tags, comments, answers, points,
const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 15,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 30,
  },
  tags: [{ type: String, required: true, trim: true }],
  comments: [commentSchema],
  answers: [answerSchema],
  points: {
    type: Number,
    default: 0,
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  views: { type: Number, default: 0 },
  hotAlgo: { type: Number, default: Date.now },
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  },
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
schemaCleaner(questionSchema);

// Export the Question model
module.exports = mongoose.model('Question', questionSchema);