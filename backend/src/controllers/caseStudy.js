const CaseStudy = require('../models/CaseStudy');
const { validationResult } = require('express-validator');

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
exports.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const category = req.query.category;
        const publishedOnly = req.query.publishedOnly === 'true';

        // Build query based on publishedOnly parameter
        const query = {};
        if (publishedOnly) {
            query.status = 'published';
        }
        if (category) {
            query.categories = category;
        }

        const totalCaseStudies = await CaseStudy.countDocuments(query);
        const totalPages = Math.ceil(totalCaseStudies / limit);

        const caseStudies = await CaseStudy.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            caseStudies,
            currentPage: page,
            totalPages,
            totalCaseStudies
        });
    } catch (error) {
        console.error('Error fetching case studies:', error);
        res.status(500).json({ message: 'Error fetching case studies' });
    }
};

// Get case study by slug
exports.getBySlug = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case study', error: error.message });
  }
};

// Get case study by ID
exports.getById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    
    res.json(caseStudy);
  } catch (error) {
    console.error('Get case study by ID error:', error);
    res.status(500).json({ message: 'Error getting case study', error: error.message });
  }
};

// Create new case study
exports.create = async (req, res) => {
  try {
    const { title, content, excerpt, industry, services, status, featuredImage, images, metaTitle, metaDescription, slug, perioada } = req.body;

    // Use custom slug if provided, otherwise generate from title
    let finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Check if slug already exists
    const existingCaseStudy = await CaseStudy.findOne({ slug: finalSlug });
    if (existingCaseStudy) {
      return res.status(400).json({ message: 'A case study with this slug already exists' });
    }

    const caseStudy = new CaseStudy({
      title,
      slug: finalSlug,
      content,
      excerpt,
      perioada,
      industry,
      services,
      status,
      featuredImage,
      images,
      metaTitle,
      metaDescription,
      date: new Date()
    });

    await caseStudy.save();
    res.status(201).json(caseStudy);
  } catch (error) {
    console.error('Create case study error:', error);
    res.status(500).json({ message: 'Error creating case study', error: error.message });
  }
};

// Update case study
exports.update = async (req, res) => {
  try {
    const { title, content, excerpt, industry, services, status, featuredImage, images, metaTitle, metaDescription, slug, perioada } = req.body;
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    // Update slug if title changed or custom slug provided
    if (slug || title !== caseStudy.title) {
      let finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      while (await CaseStudy.findOne({ slug: finalSlug, _id: { $ne: caseStudy._id } })) {
        finalSlug = `${finalSlug}-${Date.now()}`;
      }

      caseStudy.slug = finalSlug;
    }

    caseStudy.title = title;
    caseStudy.content = content;
    caseStudy.excerpt = excerpt;
    caseStudy.perioada = perioada;
    caseStudy.industry = industry;
    caseStudy.services = services;
    caseStudy.status = status;
    caseStudy.featuredImage = featuredImage;
    caseStudy.images = images;
    caseStudy.metaTitle = metaTitle;
    caseStudy.metaDescription = metaDescription;

    await caseStudy.save();
    res.json(caseStudy);
  } catch (error) {
    console.error('Update case study error:', error);
    res.status(500).json({ message: 'Error updating case study', error: error.message });
  }
};

// Delete case study
exports.delete = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Delete case study error:', error);
    res.status(500).json({ message: 'Error deleting case study', error: error.message });
  }
}; 