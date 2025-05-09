const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    sparse: true
  },
  metaTitle: {
    type: String,
    required: true,
    trim: true
  },
  metaDescription: {
    type: String,
    required: true,
    trim: true
  },
  upperContent: {
    type: String,
    default: ''
  },
  lowerContent: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
}, {
  timestamps: true
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page; 