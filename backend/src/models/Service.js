const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Titlul este obligatoriu'],
    trim: true
  },
  heroText: {
    type: String,
    required: [true, 'Textul hero este obligatoriu']
  },
  excerpt: {
    type: String,
    required: [true, 'Rezumatul este obligatoriu'],
    trim: true
  },
  heading: {
    type: String,
    required: [true, 'Heading-ul este obligatoriu'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Imaginea este obligatorie']
  },
  content: {
    type: String,
    required: [true, 'Conținutul este obligatoriu']
  },
  faqs: [{
    question: {
      type: String,
      required: [true, 'Întrebarea este obligatorie']
    },
    answer: {
      type: String,
      required: [true, 'Răspunsul este obligatorie']
    }
  }],
  metaTitle: {
    type: String,
    required: [true, 'Meta titlul este obligatoriu'],
    trim: true
  },
  metaDescription: {
    type: String,
    required: [true, 'Meta descrierea este obligatorie'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  parent_service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
}, {
  timestamps: true
});

// Create slug from title before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Add a method to get sub-services
serviceSchema.methods.getSubServices = async function() {
  return await this.model('Service').find({ parent_service_id: this._id });
};

// Add a static method to get all top-level services with their sub-services
serviceSchema.statics.getHierarchy = async function() {
  const topLevelServices = await this.find({ parent_service_id: null });
  
  // For each top-level service, get its sub-services
  const servicesWithSubs = await Promise.all(
    topLevelServices.map(async (service) => {
      const subServices = await this.find({ parent_service_id: service._id });
      return {
        ...service.toObject(),
        sub_services: subServices
      };
    })
  );
  
  return servicesWithSubs;
};

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 