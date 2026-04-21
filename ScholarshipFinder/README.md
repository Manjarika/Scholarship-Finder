# 🎓 Scholarship Finder

A comprehensive full-stack web application that helps students discover and apply for scholarships they are eligible for based on their academic profile, financial status, and personal details.

## 🚀 Quick Links

- **[Frontend Setup](./frontend/README.md)** - React application guide
- **[Backend Setup](./backend/README_BACKEND.md)** - Node.js/Express API guide  
- **[Backend Quick Start](./backend/QUICKSTART.md)** - 5-minute quick start
- **[API Documentation](./backend/API_DOCUMENTATION.md)** - Complete API reference
- **[Backend Summary](./BACKEND_SUMMARY.md)** - Implementation overview
- **[Backend File Guide](./BACKEND_FILE_GUIDE.md)** - File-by-file guide

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Contributing](#contributing)

---

## ✨ Features

### 🏠 Home Page
- **Modern Design** with gradient backgrounds and animations
- **Two Main Sections:**
  - 📚 Undergraduate (After 12th) Scholarships
  - 🎓 Postgraduate (After UG) Scholarships
- **Beautiful Cards** with emoji icons and hover effects
- **Responsive Layout** - Works on all devices

### 📋 Student Form
- **Organized Sections** for better UX:
  - 👤 Personal Information (Name, Email, Phone)
  - 📊 Academic Information (Marks, Category)
  - 💰 Financial & Location Information (Income, State)
  - ✨ Additional Information (Optional fields)
- **Form Validation** - All required fields marked
- **Intuitive UI** with placeholder text and helpful labels
- **Responsive Design** - Mobile-friendly layout

### 🎉 Results Page
- **Scholarship Cards** displaying:
  - Scholarship Name & Type Badge
  - Provider Information
  - **Scholarship Amount** (highlighted)
  - Minimum Marks Required
  - **Income Limit**
  - Duration
  - **Deadline** (in red for urgency)
  - Eligibility Criteria
  - Description
  - **Apply Button** linking to scholarship
- **No Results State** with friendly message
- **Action Buttons** for new search or home

### 🔍 Smart Matching Engine
- **Eligibility Algorithm:**
  - Matches education level (UG/PG)
  - Checks minimum marks requirement
  - Filters by category (General/OBC/SC/ST)
  - Verifies family income limit
  - Matches course preference
- **Returns** only eligible scholarships
- **Sorted** by scholarship amount (highest first)

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Navigation
- **CSS3** - Modern styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **MongoDB** - NoSQL database
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

### Development Tools
- **Nodemon** - Auto-reload for development
- **npm** - Package manager

---

## 📁 Project Structure

```
ScholarshipFinder/
│
├── frontend/                          # React Frontend
│   ├── public/
│   │   └── index.html                # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js              # Home page component
│   │   │   ├── Home.css             # Home page styles
│   │   │   ├── StudentForm.js       # Form component
│   │   │   ├── StudentForm.css      # Form styles
│   │   │   ├── ResultPage.js        # Results component
│   │   │   └── ResultPage.css       # Results styles
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # App styles
│   │   ├── index.js                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Frontend dependencies
│   └── README.md                    # Frontend documentation
│
├── backend/                           # Node.js Backend
│   ├── models/
│   │   └── Scholarship.js           # MongoDB schema
│   ├── routes/
│   │   └── scholarshipRoutes.js     # API routes & handlers
│   ├── server.js                    # Express server setup
│   ├── seedDatabase.js              # Sample data seeding
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment variables (gitignored)
│   ├── .env.example                 # Example env file
│   ├── API_DOCUMENTATION.md         # Complete API reference
│   ├── README_BACKEND.md            # Backend setup guide
│   ├── QUICKSTART.md                # 5-minute quick start
│   └── README.md                    # Backend documentation
│
├── README.md                          # This file
├── BACKEND_SUMMARY.md                 # Backend implementation summary
├── BACKEND_FILE_GUIDE.md              # File structure and guide
└── .gitignore                         # Git ignore rules
```

---

## 📦 Installation

### Prerequisites
- **Node.js** v14 or higher
- **npm** or yarn
- **MongoDB** (local or cloud instance)

### Step 1: Clone/Setup Project
```bash
cd ScholarshipFinder
```

### Step 2: Frontend Installation
```bash
cd frontend
npm install
```

### Step 3: Backend Installation
```bash
cd ../backend
npm install
```

### Step 4: Backend Configuration
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your MongoDB URI (optional, defaults to local)
# MONGODB_URI=mongodb://localhost:27017/scholarshipFinder
# PORT=5000
```

### Step 5: Seed Database (Optional)
```bash
npm run seed
```

This creates 10 sample scholarships for testing.

---

## 🚀 Running the Application

### Option 1: Run Both Frontend and Backend

**Terminal 1 - Start MongoDB** (if using local)
```bash
mongod
```

**Terminal 2 - Start Backend**
```bash
cd backend
npm start
```

**Terminal 3 - Start Frontend**
```bash
cd frontend
npm start
```

The frontend will open at **http://localhost:3000**  
The backend runs at **http://localhost:5000**

### Option 2: Development Mode with Auto-reload

**Terminal 2 - Backend (with auto-reload)**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend (with auto-reload)**
```bash
cd frontend
npm start
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Main Endpoints

#### ✅ Health Check
```
GET /health
```

#### ✅ Get All Scholarships
```
GET /scholarships
```

#### ✅ Find Eligible Scholarships (Main Endpoint)
```
POST /find-scholarships
```

**Request Body:**
```json
{
  "educationLevel": "UG",
  "marks": 85,
  "category": "General",
  "income": 600000,
  "course": "Engineering"
}
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "scholarshipName": "National Merit Scholarship",
      "level": "UG",
      "minMarks": 85,
      "category": "General",
      "incomeLimit": 800000,
      "course": "Engineering",
      "amount": "₹50,000 per year",
      ...
    }
  ]
}
```

#### Other Endpoints
- `GET /scholarships/:id` - Get specific scholarship
- `POST /scholarships/create` - Create new scholarship
- `PUT /scholarships/:id` - Update scholarship
- `DELETE /scholarships/:id` - Delete scholarship

**See [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) for complete details**

---

## 🗄️ Database

### MongoDB Collections
- **Scholarships** - Stores all scholarship records

### Sample Data
The `seedDatabase.js` script includes 10 scholarships:
- Engineering (UG & PG)
- Commerce (UG)
- Science (UG)
- MBA (PG)
- Various categories: General, OBC, SC, ST
- Different income limits: 450K to 1.2M INR
- Various amounts and deadlines

### Schema
```javascript
{
  scholarshipName: String,
  level: String,           // "UG" or "PG"
  minMarks: Number,        // 0-100
  category: String,        // "General" | "OBC" | "SC" | "ST"
  incomeLimit: Number,     // Maximum allowed family income
  course: String,          // Course name
  amount: String,          // Scholarship amount
  deadline: String,        // Application deadline
  applicationLink: String, // URL to apply
  provider: String,        // Optional: Organization name
  description: String,     // Optional: Description
  eligibility: String,     // Optional: Eligibility criteria
  duration: String,        // Optional: Scholarship duration
  createdAt: Date,         // Auto-generated
  updatedAt: Date          // Auto-updated
}
```

---

## 🎯 Functionality Workflow

### 1. User Visits Home Page
→ Sees two options: UG or PG scholarships

### 2. Clicks a Category
→ Navigated to Student Form with pre-selected level

### 3. Fills Student Details
→ Name, Email, Phone, Marks, Category, Income, State, Course

### 4. Submits Form
→ Sends POST request to `/api/find-scholarships`
→ Backend matches eligibility criteria
→ Backend returns eligible scholarships

### 5. Views Results
→ Displays matching scholarships in cards
→ Shows amount, deadline, eligibility
→ Provides link to apply

### 6. Takes Action
→ Can click "Apply Now" to visit scholarship link
→ Can do "New Search" to search again
→ Can go "Back to Home"

---

## 📚 Complete Documentation Guide

### **Documentation Index**
**👉 [READ: DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete guide to all documentation

### **Key Documentation Files**

#### Quick Start (5 minutes)
- **[QUICKSTART.md](./backend/QUICKSTART.md)** - Fastest way to get the system running
  - Prerequisites checklist
  - Step-by-step commands
  - Verification tests
  - Common issues

#### Architecture & Design (20 minutes)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system architecture
  - System architecture diagram
  - Data flow visualization
  - Component interactions
  - Database schema details
  - Eligibility algorithm
  - Debugging guide

#### Frontend Development (15 minutes)
- **[frontend/README.md](./frontend/README.md)** - React development guide
  - Component overview
  - Setup instructions
  - File structure
  - API integration
  - Testing procedures

#### Backend Development (15 minutes)
- **[backend/README_BACKEND.md](./backend/README_BACKEND.md)** - Express/Node development guide
  - Installation steps
  - Configuration guide
  - API endpoints overview
  - Database schema
  - Troubleshooting

#### API Reference (20 minutes)
- **[backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)** - Complete API spec
  - All 7 endpoints documented
  - Request/response examples
  - Error codes and meanings
  - cURL examples
  - Testing with Postman

#### Implementation Summary (15 minutes)
- **[backend/BACKEND_SUMMARY.md](./backend/BACKEND_SUMMARY.md)** - What has been implemented
  - Complete feature list
  - Database query logic
  - Error handling patterns
  - Deployment readiness

#### File Structure Guide (15 minutes)
- **[backend/BACKEND_FILE_GUIDE.md](./backend/BACKEND_FILE_GUIDE.md)** - File-by-file guide
  - Purpose of each file
  - File dependencies
  - Implementation details
  - Code changes reference

### **Choose Your Path**

**🚀 I want to run the system right now!**
→ Follow [QUICKSTART.md](./backend/QUICKSTART.md) (5 min)

**🏗️ I want to understand the system design**
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md) (20 min)

**💻 I'm a frontend developer**
→ Start with [frontend/README.md](./frontend/README.md) (15 min)

**🔧 I'm a backend developer**
→ Start with [backend/README_BACKEND.md](./backend/README_BACKEND.md) (15 min)

**🔌 I need API documentation**
→ Read [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) (20 min)

**📊 I need to understand implementation details**
→ Read [backend/BACKEND_SUMMARY.md](./backend/BACKEND_SUMMARY.md) (15 min)

**📁 I need file-by-file breakdown**
→ Read [backend/BACKEND_FILE_GUIDE.md](./backend/BACKEND_FILE_GUIDE.md) (15 min)

---

## 🧪 Testing

### Test Frontend
```bash
cd frontend
npm start
# Manually test the UI and navigation
```

### Test Backend API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Get All Scholarships:**
```bash
curl http://localhost:5000/api/scholarships
```

**Find Eligible Scholarships:**
```bash
curl -X POST http://localhost:5000/api/find-scholarships \
  -H "Content-Type: application/json" \
  -d '{
    "educationLevel": "UG",
    "marks": 85,
    "category": "General",
    "income": 600000,
    "course": "Engineering"
  }'
```

---     - Email
     - Phone Number
     - GPA / Percentage
     - Category (General, OBC, SC, ST)
     - Annual Family Income
     - State
     - Caste (optional)

3. **Results Page**
   - Displays scholarships matching the student's criteria
   - Shows scholarship details and application links

4. **Backend API**
   - GET `/api/scholarships/all` - Fetch all scholarships
   - POST `/api/scholarships/find` - Find scholarships based on student criteria
   - GET `/api/scholarships/:id` - Fetch specific scholarship
   - POST `/api/scholarships/create` - Create a new scholarship

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scholarshipFinder
NODE_ENV=development
```

Then start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Find Scholarships
**POST** `/api/scholarships/find`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "gpa": "8.5",
  "category": "General",
  "income": "500000",
  "state": "Maharashtra",
  "scholarshipType": "UG"
}
```

## Sample Data

To test the application, you can add sample scholarships to the database:

```json
{
  "name": "National Scholarship",
  "provider": "Government of India",
  "amount": 50000,
  "type": "UG",
  "duration": "4 Years",
  "eligibility": "10th Pass with 60% marks",
  "description": "Merit-based scholarship for undergraduate students",
  "categories": ["General", "OBC", "SC", "ST"],
  "minGPA": 6,
  "maxIncome": 800000,
  "states": [],
  "deadline": "2026-12-31",
  "link": "https://scholarships.gov.in"
}
```

## Usage

1. Start both frontend and backend servers
2. Open `http://localhost:3000` in your browser
3. Click on either "UG Scholarships" or "PG Scholarships"
4. Fill in your student details
5. Click "Find Scholarships"
6. View available scholarships and apply

## Future Enhancements

- User authentication and profiles
- Scholarship tracking and bookmarks
- Email notifications for new scholarships
- Advanced filtering options
- Admin panel for managing scholarships
- Integration with actual scholarship databases

## License

ISC

## Author

Scholarship Finder Team
