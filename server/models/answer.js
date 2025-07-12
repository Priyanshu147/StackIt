const mongoose = require('mongoose');
const commentSchema = require('./comment').schema;
const schemaCleaner = require('../utils/schemaCleaner');


// Define the Answer schema
// It includes fields for author, body, comments, points, upvotedBy, downvotedBy, createdAt, and updatedAt
// This schema is used to store answers to questions in the StackIt application 
const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 30,
  },
  comments: [commentSchema],
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
// This function removes any unnecessary fields or properties from the schema
schemaCleaner(answerSchema);


// Export the Answer model 
module.exports = mongoose.model('Answer', answerSchema);
