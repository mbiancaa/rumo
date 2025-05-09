const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

// Import routes
const blogRoutes = require('./routes/blog');
const teamRoutes = require('./routes/team');
const servicesRoutes = require('./routes/services');
const pagesRoutes = require('./routes/pages');
const contactSubmissionsRoutes = require('./routes/contactSubmissions');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure services upload directory exists
const servicesUploadsDir = path.join(__dirname, '../public/uploads/services');
if (!fs.existsSync(servicesUploadsDir)) {
  fs.mkdirSync(servicesUploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/contact-submissions', contactSubmissionsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app; 