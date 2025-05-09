const Service = require('../models/Service');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const { validationResult } = require('express-validator');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    // Check if hierarchical view is requested
    const hierarchical = req.query.hierarchical === 'true';
    
    if (hierarchical) {
      // Get services as a hierarchy (top-level services with their sub-services)
      const services = await Service.getHierarchy();
      res.status(200).json(services);
    } else {
      // Get all published services sorted by creation date
      const services = await Service.find({ 
        status: 'published',
        parent_service_id: null // Only get top-level services
      }).sort({ createdAt: 1 });
      res.status(200).json(services);
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Error fetching service' });
  }
};

// Get service by slug
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Error fetching service' });
  }
};

// Create new service
exports.createService = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A service with this title already exists' });
    }
    res.status(500).json({ message: 'Error creating service' });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('Update service request body:', JSON.stringify(req.body, null, 2));
    console.log('FAQs in request:', JSON.stringify(req.body.faqs, null, 2));

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // If image is being updated, delete the old image
    if (req.body.image && service.image && req.body.image !== service.image) {
      const oldImagePath = path.join(__dirname, '..', '..', 'public', 'uploads', 'services', path.basename(service.image));
      try {
        await unlinkAsync(oldImagePath);
      } catch (err) {
        console.error('Error deleting old image:', err);
      }
    }

    // Handle FAQ updates
    if (req.body.faqs !== undefined) {
      console.log('Processing FAQ updates');
      // If faqs is an empty array, it means we want to remove all FAQs
      if (req.body.faqs.length === 0) {
        console.log('Removing all FAQs');
        service.faqs = [];
      } else {
        // Update existing FAQs and add new ones
        console.log('Updating FAQs with new data');
        service.faqs = req.body.faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer
        }));
      }
      console.log('Updated FAQs:', JSON.stringify(service.faqs, null, 2));
    } else {
      console.log('No FAQs provided in update request, keeping existing FAQs');
    }

    // Update other fields
    const fieldsToUpdate = ['title', 'heroText', 'excerpt', 'heading', 'image', 'content', 'metaTitle', 'metaDescription', 'status'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        service[field] = req.body[field];
      }
    });

    console.log('Saving service with updated data');
    await service.save();
    console.log('Service saved successfully');
    console.log('Final service data:', JSON.stringify(service, null, 2));
    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A service with this title already exists' });
    }
    res.status(500).json({ message: 'Error updating service' });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete the image file
    if (service.image) {
      const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads', 'services', path.basename(service.image));
      try {
        await unlinkAsync(imagePath);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
};

// Upload service image
exports.uploadServiceImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Ensure the uploads directory exists
    const uploadsDir = path.join(__dirname, '../../public/uploads/services');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const imageUrl = `/uploads/services/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading service image:', error);
    res.status(500).json({ 
      message: 'Error uploading image',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get sub-services for a specific service
exports.getSubServices = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    const subServices = await service.getSubServices();
    res.status(200).json(subServices);
  } catch (error) {
    console.error('Error fetching sub-services:', error);
    res.status(500).json({ message: 'Error fetching sub-services' });
  }
}; 