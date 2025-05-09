const TeamMember = require('../models/TeamMember');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: 1 });
    res.json(members);
  } catch (err) {
    console.error('Get team members error:', err);
    res.status(500).json({ message: 'Error fetching team members' });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (err) {
    console.error('Get team member error:', err);
    res.status(500).json({ message: 'Error fetching team member' });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private
exports.createTeamMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, title, keyword, image, description } = req.body;

    const member = new TeamMember({
      name,
      title,
      keyword,
      image,
      description
    });

    await member.save();
    res.status(201).json(member);
  } catch (err) {
    console.error('Create team member error:', err);
    res.status(500).json({ message: 'Error creating team member' });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private
exports.updateTeamMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, title, keyword, image, description } = req.body;

    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // If image is being updated, delete the old image
    if (image && member.image !== image) {
      const oldImagePath = path.join(__dirname, '../../public/uploads', path.basename(member.image));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    member.name = name;
    member.title = title;
    member.keyword = keyword;
    member.image = image;
    member.description = description;

    await member.save();
    res.json(member);
  } catch (err) {
    console.error('Update team member error:', err);
    res.status(500).json({ message: 'Error updating team member' });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Delete the associated image
    const imagePath = path.join(__dirname, '../../public/uploads', path.basename(member.image));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Use deleteOne instead of remove
    await TeamMember.deleteOne({ _id: req.params.id });
    res.json({ message: 'Team member removed' });
  } catch (err) {
    console.error('Delete team member error:', err);
    res.status(500).json({ message: 'Error deleting team member' });
  }
};

// @desc    Upload team member image
// @route   POST /api/team/upload
// @access  Private
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (err) {
    console.error('Upload image error:', err);
    res.status(500).json({ message: 'Error uploading image' });
  }
}; 