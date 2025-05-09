const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Numele este obligatoriu'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Titlul este obligatoriu'],
    trim: true
  },
  keyword: {
    type: String,
    required: [true, 'Cuvântul cheie este obligatoriu'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Imaginea este obligatorie']
  },
  description: {
    type: String,
    required: [true, 'Descrierea este obligatorie']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema); 