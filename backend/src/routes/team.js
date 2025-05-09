const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, requireRole } = require('../middleware/auth');
const teamController = require('../controllers/team');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'team-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg, .jpeg and .gif format allowed!'));
  }
});

// Get all team members
router.get('/', teamController.getTeamMembers);

// Get single team member
router.get('/:id', teamController.getTeamMember);

// Create team member
router.post('/', [
  auth,
  requireRole(['admin', 'editor']),
  body('name').notEmpty().trim().withMessage('Numele este obligatoriu'),
  body('title').notEmpty().trim().withMessage('Titlul este obligatoriu'),
  body('keyword').notEmpty().trim().withMessage('Cuvântul cheie este obligatoriu'),
  body('image').notEmpty().withMessage('Imaginea este obligatorie'),
  body('description').notEmpty().withMessage('Descrierea este obligatorie')
], teamController.createTeamMember);

// Update team member
router.put('/:id', [
  auth,
  requireRole(['admin', 'editor']),
  body('name').notEmpty().trim().withMessage('Numele este obligatoriu'),
  body('title').notEmpty().trim().withMessage('Titlul este obligatoriu'),
  body('keyword').notEmpty().trim().withMessage('Cuvântul cheie este obligatoriu'),
  body('image').notEmpty().withMessage('Imaginea este obligatorie'),
  body('description').notEmpty().withMessage('Descrierea este obligatorie')
], teamController.updateTeamMember);

// Delete team member
router.delete('/:id', [
  auth,
  requireRole(['admin', 'editor'])
], teamController.deleteTeamMember);

// Upload team member image
router.post('/upload', [
  auth,
  requireRole(['admin', 'editor']),
  upload.single('image')
], teamController.uploadImage);

module.exports = router; 