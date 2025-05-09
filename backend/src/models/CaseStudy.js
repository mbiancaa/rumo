const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  perioada: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  services: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  featuredImage: {
    type: String
  },
  images: [{
    type: String
  }],
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
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes
caseStudySchema.index({ title: 'text', content: 'text' });
caseStudySchema.index({ slug: 1 });
caseStudySchema.index({ status: 1 });
caseStudySchema.index({ date: -1 });

module.exports = mongoose.model('CaseStudy', caseStudySchema); 