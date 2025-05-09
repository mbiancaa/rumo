require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/users');
const caseStudyRoutes = require('./routes/caseStudies');
const teamRoutes = require('./routes/team');
const servicesRoutes = require('./routes/services');
const pagesRoutes = require('./routes/pages');
const contactSubmissionsRoutes = require('./routes/contactSubmissions');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/case-studies', caseStudyRoutes);
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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 