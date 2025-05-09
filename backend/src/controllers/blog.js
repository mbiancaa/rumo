const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');

// @desc    Create a new blog post
// @route   POST /api/blog
// @access  Private
exports.createPost = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, status, categories, metaTitle, metaDescription, featuredImage, slug } = req.body;

    // Use custom slug if provided, otherwise generate from title
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Check if slug already exists
    const existingPost = await Blog.findOne({ slug: finalSlug });
    if (existingPost) {
      return res.status(400).json({ message: 'A post with this slug already exists' });
    }

    const blog = new Blog({
      title,
      slug: finalSlug,
      content,
      excerpt,
      status,
      categories,
      metaTitle,
      metaDescription,
      featuredImage,
      author: req.user._id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ message: 'Error creating blog post', error: err.message });
  }
};

// @desc    Get all blog posts
// @route   GET /api/blog
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

        const totalBlogs = await Blog.countDocuments(query);
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            blogs,
            currentPage: page,
            totalPages,
            totalBlogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};

// @desc    Get single blog post
// @route   GET /api/blog/:identifier
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    let blog;
    if (isObjectId) {
      blog = await Blog.findById(identifier);
    } else {
      blog = await Blog.findOne({ slug: identifier });
    }
    
    if (!blog) {
      return res.status(404).json({ message: 'Postarea nu a fost găsită' });
    }
    
    res.json(blog);
  } catch (err) {
    console.error('Get blog error:', err);
    res.status(500).json({ message: 'Eroare la preluarea postării', error: err.message });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Postarea nu a fost găsită' });
    }

    // Check if user is the author or an admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Nu ești autorizat să actualizezi această postare' });
    }

    const { title, content, excerpt, status, categories, metaTitle, metaDescription, featuredImage, slug } = req.body;
    const updateData = {
      title,
      content,
      excerpt,
      status,
      categories,
      metaTitle,
      metaDescription,
      featuredImage
    };

    // Handle slug updates
    if (slug && slug !== blog.slug) {
      // Check if new slug already exists
      const existingPost = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingPost) {
        return res.status(400).json({ message: 'O postare cu acest slug deja există' });
      }
      updateData.slug = slug;
    } else if (title && title !== blog.title) {
      // If no custom slug provided and title changed, generate new slug
      const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existingPost = await Blog.findOne({ slug: newSlug, _id: { $ne: req.params.id } });
      if (existingPost) {
        return res.status(400).json({ message: 'O postare cu acest titlu deja există' });
      }
      updateData.slug = newSlug;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('author', 'name');

    res.json(updatedBlog);
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ message: 'Eroare la actualizarea postării', error: err.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Postarea nu a fost găsită' });
    }

    // Check if user is the author or an admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Nu ești autorizat să ștergi această postare' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Postarea a fost ștearsă cu succes' });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ message: 'Eroare la ștergerea postării', error: err.message });
  }
}; 