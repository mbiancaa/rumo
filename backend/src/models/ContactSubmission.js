const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  nume: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefon: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  mesaj: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema); 