const mongoose = require('mongoose');
require('dotenv').config();
const Scholarship = require('./models/Scholarship');

// Sample scholarship data - 15 comprehensive scholarships
const sampleScholarships = [
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
    eligibility: 'Class 12 pass with minimum 70% marks, family income <= 8 lakh',
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
    description: 'Special scholarship for SC/ST students pursuing engineering',
    eligibility: 'Class 12 pass with minimum 60% marks, SC/ST certificate required',
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
    applicationLink: 'https://scholarships.gov.in/scienceexcel',
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
    applicationLink: 'https://scholarships.gov.in/stengaward',
    provider: 'Tribal Affairs Ministry',
    description: 'Specialized scholarship for ST category engineering aspirants',
    eligibility: 'Class 12 pass with minimum 70% marks, ST certificate required',
    duration: '4 Years',
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
    applicationLink: 'https://scholarships.edu.in/womenpg',
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
    applicationLink: 'https://scholarships.edu.in/mba',
    provider: 'Business Education Council',
    description: 'Merit-based scholarship for MBA students',
    eligibility: 'B.Com/B.Tech pass with minimum 85% marks',
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
    applicationLink: 'https://scholarships.edu.in/obcpgresearch',
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
    applicationLink: 'https://scholarships.edu.in/scpgaward',
    provider: 'Ministry of Social Justice',
    description: 'Postgraduate scholarship for SC category Science students',
    eligibility: 'B.Sc pass with minimum 72% marks',
    duration: '2 Years',
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
    applicationLink: 'https://scholarships.health.gov.in/medicine',
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
    applicationLink: 'https://scholarships.law.gov.in/ugexcel',
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
];

// Function to seed database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarshipFinder', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing scholarships
    await Scholarship.deleteMany({});
    console.log('🗑️  Cleared existing scholarships');

    // Insert sample data
    const result = await Scholarship.insertMany(sampleScholarships);
    console.log(`✅ Successfully inserted ${result.length} sample scholarships`);

    // Display inserted data
    console.log('\n📚 Sample Scholarships:');
    result.forEach((scholarship, index) => {
      console.log(`${index + 1}. ${scholarship.scholarshipName} (${scholarship.level})`);
    });

    console.log('\n✨ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
