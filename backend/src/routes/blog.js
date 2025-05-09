const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, requireRole } = require('../middleware/auth');
const { body } = require('express-validator');
const blogController = require('../controllers/blog');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  }
});

// Image upload endpoint
router.post('/upload', [
  auth,
  requireRole(['admin', 'editor']),
  upload.single('image')
], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({ 
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Create blog post
router.post('/', [
  auth,
  requireRole(['admin', 'editor']),
  body('title').notEmpty().trim(),
  body('content').notEmpty(),
  body('excerpt').notEmpty().trim(),
  body('status').isIn(['draft', 'published']),
  body('categories').isArray().notEmpty()
], blogController.createPost);

// Get all blog posts
router.get('/', blogController.getAll);

// Get single blog post
router.get('/:identifier', blogController.getPost);

// Update blog post
router.put('/:id', [
  auth,
  requireRole(['admin', 'editor']),
  body('title').optional().notEmpty().trim(),
  body('content').optional().notEmpty(),
  body('excerpt').optional().notEmpty().trim(),
  body('status').optional().isIn(['draft', 'published']),
  body('categories').optional().isArray().notEmpty()
], blogController.updatePost);

// Delete blog post
router.delete('/:id', [
  auth,
  requireRole(['admin', 'editor'])
], blogController.deletePost);

module.exports = router; 