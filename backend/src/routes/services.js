const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body } = require('express-validator');
const { auth, requireRole } = require('../middleware/auth');
const {
  getAllServices,
  getServiceById,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  uploadServiceImage,
  getSubServices
} = require('../controllers/services');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../public/uploads/services');
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `service-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Public routes
router.get('/', getAllServices);
router.get('/hierarchy', (req, res, next) => {
  req.query.hierarchical = 'true';
  next();
}, getAllServices);
router.get('/id/:id', auth, requireRole(['admin', 'editor']), getServiceById);
router.get('/:slug', getServiceBySlug);
router.get('/:id/sub-services', getSubServices);

// Protected routes (admin only)
router.post('/', 
  auth, 
  requireRole(['admin', 'editor']), 
  [
    body('title').notEmpty().trim(),
    body('heroText').notEmpty(),
    body('excerpt').notEmpty().trim(),
    body('heading').notEmpty().trim(),
    body('image').notEmpty(),
    body('content').notEmpty(),
    body('metaTitle').notEmpty().trim(),
    body('metaDescription').notEmpty().trim(),
    body('faqs').optional().isArray(),
    body('faqs.*.question').optional().notEmpty().trim(),
    body('faqs.*.answer').optional().notEmpty()
  ],
  createService
);

router.put('/:id', 
  auth,
  requireRole(['admin', 'editor']), 
  [
    body('title').optional().notEmpty().trim(),
    body('heroText').optional().notEmpty(),
    body('excerpt').optional().notEmpty().trim(),
    body('heading').optional().notEmpty().trim(),
    body('image').optional().notEmpty(),
    body('content').optional().notEmpty(),
    body('metaTitle').optional().notEmpty().trim(),
    body('metaDescription').optional().notEmpty().trim(),
    body('faqs').optional().isArray(),
    body('faqs.*.question').optional().notEmpty().trim(),
    body('faqs.*.answer').optional().notEmpty()
  ],
  updateService
);

router.delete('/:id', auth, requireRole(['admin', 'editor']), deleteService);
router.post('/upload', auth, requireRole(['admin', 'editor']), upload.single('image'), uploadServiceImage);

module.exports = router; 