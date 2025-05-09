const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth, requireRole } = require('../middleware/auth');
const {
  getAllPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/pages');

// Validation middleware
const pageValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body('slug')
    .optional()
    .trim(),
  body('metaTitle')
    .notEmpty()
    .withMessage('Meta title is required')
    .trim(),
  body('metaDescription')
    .notEmpty()
    .withMessage('Meta description is required')
    .trim(),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
];

// Public routes
router.get('/', getAllPages);
router.get('/:slug', getPageBySlug);
router.get('/id/:id', getPageById);

// Protected routes
router.post('/', [
  auth,
  requireRole(['admin', 'editor']),
  ...pageValidation
], createPage);

router.put('/:id', [
  auth,
  requireRole(['admin', 'editor']),
  ...pageValidation
], updatePage);

router.delete('/:id', [
  auth,
  requireRole(['admin'])
], deletePage);

module.exports = router; 