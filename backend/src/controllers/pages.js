const Page = require('../models/Page');
const { validationResult } = require('express-validator');

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.status(200).json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ message: 'Error fetching pages' });
  }
};

// Get page by slug
exports.getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ 
      slug: req.params.slug,
      status: 'published' 
    });
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.status(200).json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ message: 'Error fetching page' });
  }
};

// Get page by ID
exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new page
exports.createPage = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A page with this meta title already exists' });
    }
    res.status(500).json({ message: 'Error creating page' });
  }
};

// Update page
exports.updatePage = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // Update all fields from the request body
    const fieldsToUpdate = ['name', 'slug', 'metaTitle', 'metaDescription', 'upperContent', 'lowerContent', 'status'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        page[field] = req.body[field];
      }
    });

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A page with this slug already exists' });
    }
    res.status(500).json({ message: 'Error updating page' });
  }
};

// Delete page
exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    await Page.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ message: 'Error deleting page' });
  }
}; 