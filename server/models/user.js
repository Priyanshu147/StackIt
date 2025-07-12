const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemaCleaner = require('../utils/schemaCleaner');


// Define the User schema
// It includes fields for username, passwordHash, role, questions, answers, and timestamps
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
    unique: true,
  },
  passwordHash: {   // This field stores the hashed password for the user
    type: String, 
    required: true, 
  },
  role: { type: String, default: 'user' },  // This field indicates the role of the user, defaulting to 'user'
  questions: [
    {
      quesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },// This field references the Question model
      rep: { type: Number, default: 0 },
    },
  ],
  answers: [
    {
      ansId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },// This field references the Answer model
      rep: { type: Number, default: 0 },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Ensure the username is unique
// This plugin adds a validation to ensure that the username is unique across the collection
userSchema.plugin(uniqueValidator);
schemaCleaner(userSchema);


// Add a method to the User schema to check if the password matches
// This method compares the provided password with the stored password hash
module.exports = mongoose.model('User', userSchema);