const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Database - Sample Scholarships
const mockScholarships = [
  {
    _id: '1',
    scholarshipName: 'National Scholarship',
    level: 'UG',
    minMarks: 60,
    category: 'General',
    incomeLimit: 1000000,
    course: 'Engineering',
    amount: '₹50,000',
    deadline: '2026-05-31',
    applicationLink: 'https://scholarships.gov.in/apply',
    provider: 'Government of India',
    description: 'Merit-based scholarship for engineering students',
    eligibility: 'Marks >= 60, Income <= 10 lakh',
    duration: '4 years',
  },
  {
    _id: '2',
    scholarshipName: 'Merit Excellence Scholarship',
    level: 'UG',
    minMarks: 75,
    category: 'General',
    incomeLimit: 800000,
    course: 'Engineering',
    amount: '₹75,000',
    deadline: '2026-06-30',
    applicationLink: 'https://scholarships.gov.in/apply',
    provider: 'Private Foundation',
    description: 'Excellence scholarship for top engineering students',
    eligibility: 'Marks >= 75, Income <= 8 lakh',
    duration: '4 years',
  },
  {
    _id: '3',
    scholarshipName: 'SC/ST Scholarship Program',
    level: 'UG',
    minMarks: 50,
    category: 'SC',
    incomeLimit: 1500000,
    course: 'Engineering',
    amount: '₹1,00,000',
    deadline: '2026-07-31',
    applicationLink: 'https://scholarships.gov.in/apply',
    provider: 'Ministry of Education',
    description: 'Special scholarship for SC/ST category students',
    eligibility: 'Marks >= 50, SC/ST category, Income <= 15 lakh',
    duration: '4 years',
  },
  {
    _id: '4',
    scholarshipName: 'OBC Merit Scholarship',
    level: 'UG',
    minMarks: 55,
    category: 'OBC',
    incomeLimit: 1200000,
    course: 'Commerce',
    amount: '₹60,000',
    deadline: '2026-04-30',
    applicationLink: 'https://scholarships.gov.in/apply',
    provider: 'Education Board',
    description: 'Merit-based scholarship for OBC students in commerce',
    eligibility: 'Marks >= 55, OBC category, Income <= 12 lakh',
    duration: '3 years',
  },
  {
    _id: '5',
    scholarshipName: 'Post-Graduate Research Fellowship',
    level: 'PG',
    minMarks: 70,
    category: 'General',
    incomeLimit: 2000000,
    course: 'Computer Science',
    amount: '₹1,50,000',
    deadline: '2026-08-31',
    applicationLink: 'https://scholarships.gov.in/apply',
    provider: 'University Grants Commission',
    description: 'Research fellowship for postgraduate students',
    eligibility: 'Marks >= 70, Income <= 20 lakh',
    duration: '2 years',
  },
  {
    _id: '6',
    scholarshipName: 'Women Empowerment Scholarship',
    level: 'PG',
    minMarks: 60,
    category: 'General',
    incomeLimit: 1800000,
    course: 'Engineering',
    amount: '₹1,20,000',
    deadline: '2026-09-30',
    applicationLink: 'https://scholarships.gov.in/apply',
    provider: 'Women Development Fund',
    description: 'Scholarship to promote women in engineering and technology',
    eligibility: 'Female candidate, Marks >= 60, Income <= 18 lakh',
    duration: '2 years',
  },
];

console.log('✅ Backend initialized with mock database (10 sample scholarships)');

// Routes - Using Mock Database

// GET all scholarships
app.get('/api/scholarships', (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: mockScholarships.length,
      data: mockScholarships,
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

// POST find eligible scholarships
app.post('/api/find-scholarships', (req, res) => {
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

    // Filter scholarships matching criteria
   const scholarships = mockScholarships.filter((scholarship) => {
  const levelMatches = scholarship.level === educationLevel;

  const marksMatches = parseFloat(marks) >= scholarship.minMarks;

  const incomeMatches = parseFloat(income) <= scholarship.incomeLimit;

  const categoryMatches =
    scholarship.category === category || scholarship.category === "All";

  const courseMatches =
    scholarship.course === "Any" ||
    new RegExp(course, "i").test(scholarship.course);

  return (
    levelMatches &&
    marksMatches &&
    incomeMatches &&
    categoryMatches &&
    courseMatches
  );
});
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

// POST create a new scholarship (admin)
app.post('/api/scholarships/create', (req, res) => {
  try {
    const {
      scholarshipName,
      level,
      minMarks,
      category,
      incomeLimit,
      course,
      amount,
      deadline,
      applicationLink,
      provider,
      description,
      eligibility,
      duration,
    } = req.body;

    if (
      !scholarshipName ||
      !level ||
      minMarks === undefined ||
      !category ||
      incomeLimit === undefined ||
      !course ||
      !amount ||
      !deadline ||
      !applicationLink
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required scholarship fields',
      });
    }

    const newScholarship = {
      _id: String(Date.now() + mockScholarships.length + 1),
      scholarshipName,
      level,
      minMarks: Number(minMarks),
      category,
      incomeLimit: Number(incomeLimit),
      course,
      amount,
      deadline,
      applicationLink,
      provider: provider || 'Unknown',
      description: description || '',
      eligibility: eligibility || '',
      duration: duration || '',
    };

    mockScholarships.push(newScholarship);

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

// DELETE remove a scholarship by id (admin)
app.delete('/api/scholarships/:id', (req, res) => {
  try {
    const id = req.params.id;
    const index = mockScholarships.findIndex((scholarship) => scholarship._id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found',
      });
    }

    mockScholarships.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: 'Scholarship deleted successfully',
      id,
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

// Seed endpoint - Populate mock database with sample scholarships
app.post('/api/seed', (req, res) => {
  try {
    // Clear existing mock data
    mockScholarships.length = 0;

    // Add 15 comprehensive sample scholarships
    const seedData = [
      {
        scholarshipName: 'Pragati Scholarship',
        level: 'UG',
        minMarks: 70,
        category: 'General',
        incomeLimit: 800000,
        course: 'Engineering',
        amount: '₹50,000',
        deadline: '30 June 2026',
        applicationLink: 'https://scholarships.gov.in/pragati',
        provider: 'Government of India',
        description: 'Merit-based scholarship for engineering students from low-income families',
        eligibility: 'Class 12 pass with minimum 70% marks',
        duration: '4 Years',
      },
      {
        scholarshipName: 'National Merit Scholarship - Engineering',
        level: 'UG',
        minMarks: 85,
        category: 'General',
        incomeLimit: 1000000,
        course: 'Engineering',
        amount: '₹75,000',
        deadline: '15 July 2026',
        applicationLink: 'https://scholarships.gov.in/nationalmerit',
        provider: 'Government of India',
        description: 'Premium scholarship for top engineering students',
        eligibility: 'Class 12 pass with minimum 85% marks',
        duration: '4 Years',
      },
      {
        scholarshipName: 'OBC Excellence Award',
        level: 'UG',
        minMarks: 75,
        category: 'OBC',
        incomeLimit: 600000,
        course: 'Engineering',
        amount: '₹60,000',
        deadline: '31 July 2026',
        applicationLink: 'https://scholarships.gov.in/obcexcel',
        provider: 'Ministry of Social Justice',
        description: 'Excellence scholarship for OBC category engineering students',
        eligibility: 'Class 12 pass with minimum 75% marks, OBC certificate required',
        duration: '4 Years',
      },
      {
        scholarshipName: 'SC/ST Scholarship - Engineering',
        level: 'UG',
        minMarks: 60,
        category: 'SC',
        incomeLimit: 500000,
        course: 'Engineering',
        amount: '₹80,000',
        deadline: '31 August 2026',
        applicationLink: 'https://scholarships.gov.in/scsteng',
        provider: 'Central Government',
        description: 'Special scholarship for SC students pursuing engineering',
        eligibility: 'Class 12 pass with minimum 60% marks, SC certificate required',
        duration: '4 Years',
      },
      {
        scholarshipName: 'Commerce Merit Scholarship',
        level: 'UG',
        minMarks: 80,
        category: 'General',
        incomeLimit: 700000,
        course: 'Commerce',
        amount: '₹45,000',
        deadline: '15 August 2026',
        applicationLink: 'https://scholarships.gov.in/commercemerit',
        provider: 'Department of Higher Education',
        description: 'Merit-based scholarship for commerce students',
        eligibility: 'Class 12 pass with minimum 80% marks',
        duration: '3 Years',
      },
      {
        scholarshipName: 'Science Excellence Award',
        level: 'UG',
        minMarks: 85,
        category: 'OBC',
        incomeLimit: 750000,
        course: 'Science',
        amount: '₹55,000',
        deadline: '30 September 2026',
        applicationLink: 'https://www.aicte-india.org/scienceexcel',
        provider: 'National Science Foundation',
        description: 'Excellence award for talented science students',
        eligibility: 'Class 12 pass with minimum 85% marks in science',
        duration: '3 Years',
      },
      {
        scholarshipName: 'ST Category Engineering Award',
        level: 'UG',
        minMarks: 70,
        category: 'ST',
        incomeLimit: 450000,
        course: 'Engineering',
        amount: '₹70,000',
        deadline: '15 September 2026',
        applicationLink: 'https://www.aicte-india.org/stengaward',
        provider: 'Tribal Affairs Ministry',
        description: 'Specialized scholarship for ST category engineering students',
        eligibility: 'Class 12 pass with minimum 70% marks, ST certificate required',
        duration: '4 Years',
      },
      {
        scholarshipName: 'Medicine Excellence Award',
        level: 'UG',
        minMarks: 90,
        category: 'General',
        incomeLimit: 1000000,
        course: 'Medicine',
        amount: '₹150,000',
        deadline: '31 May 2026',
        applicationLink: 'https://www.aicte-india.org/medicine',
        provider: 'Ministry of Health',
        description: 'Premium scholarship for top medicine students',
        eligibility: 'NEET qualified with minimum 90% marks',
        duration: '5.5 Years',
      },
      {
        scholarshipName: 'Law Graduate Excellence Fund',
        level: 'UG',
        minMarks: 82,
        category: 'OBC',
        incomeLimit: 600000,
        course: 'Law',
        amount: '₹40,000',
        deadline: '31 July 2026',
        applicationLink: 'https://www.ugc.gov.in/ugexcel',
        provider: 'Bar Council of India',
        description: 'Excellence fund for law undergraduate students',
        eligibility: '12th pass with minimum 82% marks',
        duration: '5 Years',
      },
      {
        scholarshipName: 'Arts & Humanities Merit Scholarship',
        level: 'UG',
        minMarks: 75,
        category: 'ST',
        incomeLimit: 550000,
        course: 'Arts',
        amount: '₹35,000',
        deadline: '31 August 2026',
        applicationLink: 'https://scholarships.humanities.gov.in/merit',
        provider: 'Department of Culture',
        description: 'Merit scholarship for ST category arts students',
        eligibility: '12th pass with minimum 75% marks, ST certificate required',
        duration: '3 Years',
      },
      {
        scholarshipName: 'Post Graduation Excellence Award',
        level: 'PG',
        minMarks: 80,
        category: 'General',
        incomeLimit: 1000000,
        course: 'Engineering',
        amount: '₹100,000',
        deadline: '31 May 2026',
        applicationLink: 'https://scholarships.edu.in/pgexcel',
        provider: 'University Grants Commission',
        description: 'Excellence scholarship for postgraduate engineering students',
        eligibility: 'B.Tech pass with minimum 80% marks',
        duration: '2 Years',
      },
      {
        scholarshipName: 'Women Empowerment PG Scholarship',
        level: 'PG',
        minMarks: 75,
        category: 'General',
        incomeLimit: 800000,
        course: 'Engineering',
        amount: '₹85,000',
        deadline: '30 June 2026',
        applicationLink: 'https://www.ugc.gov.in/womenpg',
        provider: 'Ministry of Education',
        description: 'Special scholarship for women pursuing postgraduate engineering studies',
        eligibility: 'B.Tech pass with minimum 75% marks',
        duration: '2 Years',
      },
      {
        scholarshipName: 'MBA Merit Scholarship',
        level: 'PG',
        minMarks: 85,
        category: 'General',
        incomeLimit: 1200000,
        course: 'MBA',
        amount: '₹120,000',
        deadline: '30 April 2026',
        applicationLink: 'https://www.ugc.gov.in/mba',
        provider: 'Business Education Council',
        description: 'Merit-based scholarship for MBA students',
        eligibility: 'Bachelor degree pass with minimum 85% marks',
        duration: '2 Years',
      },
      {
        scholarshipName: 'OBC PG Research Fellowship',
        level: 'PG',
        minMarks: 78,
        category: 'OBC',
        incomeLimit: 900000,
        course: 'Engineering',
        amount: '₹95,000',
        deadline: '31 May 2026',
        applicationLink: 'https://www.aicte-india.org/obcpgresearch',
        provider: 'Council of Scientific & Industrial Research',
        description: 'Research fellowship for OBC postgraduate engineering students',
        eligibility: 'B.Tech pass with minimum 78% marks',
        duration: '2 Years',
      },
      {
        scholarshipName: 'SC Category PG Award',
        level: 'PG',
        minMarks: 72,
        category: 'SC',
        incomeLimit: 800000,
        course: 'Science',
        amount: '₹90,000',
        deadline: '30 June 2026',
        applicationLink: 'https://www.aicte-india.org/scpgaward',
        provider: 'Ministry of Social Justice',
        description: 'Postgraduate scholarship for SC category Science students',
        eligibility: 'B.Sc pass with minimum 72% marks',
        duration: '2 Years',
      },
    ];

    // Add seeds to mock database
    mockScholarships.push(...seedData);

    return res.status(200).json({
      success: true,
      count: seedData.length,
      message: `Successfully seeded database with ${seedData.length} sample scholarships`,
      data: {
        ugScholarships: seedData.filter(s => s.level === 'UG').length,
        pgScholarships: seedData.filter(s => s.level === 'PG').length,
      },
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Scholarship Finder Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      getAllScholarships: 'GET /api/scholarships',
      findEligibleScholarships: 'POST /api/find-scholarships',
      getScholarshipById: 'GET /api/scholarships/:id',
      createScholarship: 'POST /api/scholarships/create',
      updateScholarship: 'PUT /api/scholarships/:id',
      deleteScholarship: 'DELETE /api/scholarships/:id',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// Export app for Vercel serverless functions
module.exports = app;

// Start server only in development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Scholarship Finder Backend Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️  Mock Database: 6 sample scholarships loaded\n`);
  });
}
