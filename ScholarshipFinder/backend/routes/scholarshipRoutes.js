const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

/**
 * GET /scholarships
 * Returns all scholarships from the database
 */
router.get('/scholarships', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships,
    });
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching scholarships',
      error: error.message,
    });
  }
});

/**
 * POST /find-scholarships
 * Receives student details and returns eligible scholarships
 * 
 * Expected request body:
 * {
 *   "educationLevel": "UG" or "PG",
 *   "marks": number,
 *   "category": "General" | "OBC" | "SC" | "ST",
 *   "income": number,
 *   "course": string
 * }
 * 
 * Eligibility criteria:
 * - student_marks >= scholarship.minMarks
 * - student_income <= scholarship.incomeLimit
 * - scholarship.level matches educationLevel
 * - scholarship.category matches student category
 * - scholarship.course matches student course
 */
router.post('/find-scholarships', async (req, res) => {
  try {
    const { educationLevel, marks, category, income, course } = req.body;

    // Validate request body
    if (!educationLevel || marks === undefined || !category || income === undefined || !course) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: educationLevel, marks, category, income, course',
      });
    }

    // Validate educationLevel
    if (!['UG', 'PG'].includes(educationLevel)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid educationLevel. Must be "UG" or "PG"',
      });
    }

    // Validate category
    const validCategories = ['General', 'OBC', 'SC', 'ST'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
      });
    }

    // Build eligibility query based on criteria
    const query = {
      level: educationLevel,
      minMarks: { $lte: parseFloat(marks) },
      category: category,
      incomeLimit: { $gte: parseFloat(income) },
      course: { $regex: course, $options: 'i' }, // Case-insensitive course matching
    };

    // Find scholarships matching all criteria
    const scholarships = await Scholarship.find(query).sort({ amount: -1 });

    return res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships,
      message: scholarships.length > 0 
        ? `Found ${scholarships.length} eligible scholarship(s)` 
        : 'No scholarships found matching your criteria',
    });
  } catch (error) {
    console.error('Error finding scholarships:', error);
    return res.status(500).json({
      success: false,
      message: 'Error finding scholarships',
      error: error.message,
    });
  }
});

/**
 * GET /scholarships/:id
 * Get a specific scholarship by ID
 */
router.get('/scholarships/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: scholarship,
    });
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching scholarship',
      error: error.message,
    });
  }
});

/**
 * POST /scholarships/create
 * Create a new scholarship (for admin/testing purposes)
 */
router.post('/scholarships/create', async (req, res) => {
  try {
    const { scholarshipName, level, minMarks, category, incomeLimit, course, amount, deadline, applicationLink } = req.body;

    // Validate required fields
    if (!scholarshipName || !level || minMarks === undefined || !category || incomeLimit === undefined || !course || !amount || !deadline || !applicationLink) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Create new scholarship
    const newScholarship = new Scholarship({
      scholarshipName,
      level,
      minMarks,
      category,
      incomeLimit,
      course,
      amount,
      deadline,
      applicationLink,
      provider: req.body.provider || 'Unknown',
      description: req.body.description || '',
      eligibility: req.body.eligibility || '',
      duration: req.body.duration || '',
    });

    await newScholarship.save();

    return res.status(201).json({
      success: true,
      message: 'Scholarship created successfully',
      data: newScholarship,
    });
  } catch (error) {
    console.error('Error creating scholarship:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating scholarship',
      error: error.message,
    });
  }
});

/**
 * PUT /scholarships/:id
 * Update a scholarship
 */
router.put('/scholarships/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Scholarship updated successfully',
      data: scholarship,
    });
  } catch (error) {
    console.error('Error updating scholarship:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating scholarship',
      error: error.message,
    });
  }
});

/**
 * DELETE /scholarships/:id
 * Delete a scholarship
 */
router.delete('/scholarships/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);

    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Scholarship deleted successfully',
      data: scholarship,
    });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting scholarship',
      error: error.message,
    });
  }
});

module.exports = router;
