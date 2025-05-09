const ContactSubmission = require('../models/ContactSubmission');
const Blog = require('../models/Blog');
const CaseStudy = require('../models/CaseStudy');
const Service = require('../models/Service');
const Page = require('../models/Page');

// @route   POST /api/contact-submissions
// @desc    Create a new contact submission
// @access  Public
exports.create = async (req, res) => {
  try {
    const submission = new ContactSubmission(req.body);
    await submission.save();
    res.status(201).json({ message: 'Successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @route   GET /api/contact-submissions
// @desc    Get all contact submissions with pagination
// @access  Private
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const submissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ContactSubmission.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      submissions,
      currentPage: page,
      totalPages,
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @route   PUT /api/contact-submissions/:id
// @desc    Update a contact submission
// @access  Private
exports.update = async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const updatedSubmission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedSubmission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @route   DELETE /api/contact-submissions/:id
// @desc    Delete a contact submission
// @access  Private
exports.delete = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Submission removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @route   GET /api/contact-submissions/dashboard
// @desc    Get latest 3 unread emails and total unread count
// @access  Private
exports.getDashboardEmails = async (req, res) => {
  try {
    // Get total published counts (needed for all users)
    const [totalPublishedArticles, totalPublishedCaseStudies, totalPublishedServices, totalPublishedPages] = await Promise.all([
      Blog.countDocuments({ status: 'published' }),
      CaseStudy.countDocuments({ status: 'published' }),
      Service.countDocuments({ status: 'published' }),
      Page.countDocuments({ status: 'published' })
    ]);

    // If not admin, return only the published counts
    if (req.user.role !== 'admin') {
      return res.json({
        latestUnreadEmails: [],
        totalUnreadCount: 0,
        totalPublishedArticles,
        totalPublishedCaseStudies,
        totalPublishedServices,
        totalPublishedPages
      });
    }

    // For admin users, get email data
    const [latestUnreadEmails, totalUnreadCount] = await Promise.all([
      ContactSubmission.find({ read: false })
        .sort({ createdAt: -1 })
        .limit(4),
      ContactSubmission.countDocuments({ read: false })
    ]);

    res.json({
      latestUnreadEmails,
      totalUnreadCount,
      totalPublishedArticles,
      totalPublishedCaseStudies,
      totalPublishedServices,
      totalPublishedPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}; 