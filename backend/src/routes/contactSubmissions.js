const express = require('express');
const router = express.Router();
const { getAll, update, delete: deleteSubmission, create } = require('../controllers/contactSubmissions');
const { auth } = require('../middleware/auth');
const contactSubmissionsController = require('../controllers/contactSubmissions');

// Public route for creating submissions
router.post('/', create);

// Protected routes
router.get('/', auth, getAll);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteSubmission);

// @route   GET /api/contact-submissions/dashboard
// @desc    Get latest 4 unread emails and total unread count
// @access  Private
router.get('/dashboard', auth, contactSubmissionsController.getDashboardEmails);

module.exports = router; 