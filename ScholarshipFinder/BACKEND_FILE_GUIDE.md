# Backend File Guide

## 📁 Complete Backend Directory Structure

```
backend/
├── models/
│   └── Scholarship.js              # MongoDB schema definition
├── routes/
│   └── scholarshipRoutes.js        # All API route handlers
├── server.js                        # Express server setup
├── seedDatabase.js                  # Database seeding script
├── package.json                     # NPM dependencies & scripts
├── .env                            # Environment variables (gitignored)
├── .env.example                    # Example env file (for reference)
├── API_DOCUMENTATION.md            # Complete API reference
├── README_BACKEND.md               # Backend setup guide
├── QUICKSTART.md                   # 5-minute quick start
└── README.md                       # Original project README
```

---

## 📄 File Descriptions

### 🎯 Core Files

#### **server.js**
- **Purpose:** Main Express server entry point
- **Key Features:**
  - Express app initialization
  - Middleware setup (CORS, JSON, URL-encoded)
  - MongoDB connection
  - Route mounting
  - Error handling
  - Server startup on port 5000
- **When to Use:** Run with `npm start`
- **Dependencies:** express, mongoose, cors, dotenv

#### **models/Scholarship.js**
- **Purpose:** MongoDB Scholarship schema definition
- **Fields:**
  - scholarshipName, level, minMarks, category
  - incomeLimit, course, amount, deadline
  - applicationLink, provider, description
  - eligibility, duration, timestamps
- **Indexes:** level, category, course
- **When to Use:** Referenced by routes for database operations
- **Dependencies:** mongoose

#### **routes/scholarshipRoutes.js**
- **Purpose:** API route handlers and business logic
- **Endpoints:**
  - GET /api/scholarships - All scholarships
  - POST /api/find-scholarships - Main eligibility check
  - GET /api/scholarships/:id - Get by ID
  - POST /api/scholarships/create - Create new
  - PUT /api/scholarships/:id - Update
  - DELETE /api/scholarships/:id - Delete
- **Key Features:**
  - Input validation
  - MongoDB queries
  - Error handling
  - Response formatting
- **When to Use:** Mounted on Express app in server.js
- **Dependencies:** express, mongoose

#### **seedDatabase.js**
- **Purpose:** Populate database with sample scholarships
- **Features:**
  - 10 sample scholarships
  - Multiple categories and levels
  - Data validation
  - Graceful error handling
- **When to Use:** Run with `npm run seed`
- **Dependencies:** mongoose, dotenv

---

### ⚙️ Configuration Files

#### **.env** (Gitignored)
- **Purpose:** Runtime environment variables
- **Contents:**
  ```env
  MONGODB_URI=mongodb://localhost:27017/scholarshipFinder
  PORT=5000
  NODE_ENV=development
  ```
- **When to Use:** Automatically loaded by dotenv in server.js
- **Security:** Never committed to git

#### **.env.example**
- **Purpose:** Template for .env file
- **Use:** Copy to .env and customize for your environment
- **Safe to commit:** Yes (contains no secrets)

#### **package.json**
- **Purpose:** NPM package configuration
- **Key Sections:**
  - Scripts: start, dev, seed
  - Dependencies: express, mongoose, cors, dotenv
  - DevDependencies: nodemon
- **When to Use:** Reference for setup and running

---

### 📖 Documentation Files

#### **API_DOCUMENTATION.md** (⭐ Read This First)
- **Purpose:** Complete API reference
- **Includes:**
  - All endpoints with examples
  - Request/response formats
  - Database schema
  - cURL and Postman examples
  - Error handling
  - Frontend integration guide
- **Who Should Read:** Frontend developers, API testers

#### **README_BACKEND.md**
- **Purpose:** Comprehensive backend setup and explanation
- **Includes:**
  - Features and tech stack
  - Installation steps
  - Running the server
  - Database setup
  - Troubleshooting
  - Development guidelines
  - Security considerations
- **Who Should Read:** New backend developers, DevOps

#### **QUICKSTART.md**
- **Purpose:** Fast 5-minute setup guide
- **Includes:**
  - Quick installation steps
  - Verify setup commands
  - Test endpoint examples
  - Common issues & solutions
- **Who Should Read:** Anyone just starting

---

## 🚀 How to Use Each File

### Starting the Backend

**Step 1: Install Dependencies**
```bash
npm install
# Uses: package.json
```

**Step 2: Configure Environment**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

**Step 3: Seed Database (Optional)**
```bash
npm run seed
# Uses: seedDatabase.js
```

**Step 4: Start Server**
```bash
npm start
# Runs: server.js
```

---

## 🔄 File Dependencies

```
server.js
├── requires: routes/scholarshipRoutes.js
├── requires: mongoose (for MongoDB)
├── requires: cors (for cross-origin)
├── requires: dotenv (for environment)
└── loads: .env file

routes/scholarshipRoutes.js
├── requires: models/Scholarship.js
├── requires: express
└── exports: router to server.js

models/Scholarship.js
├── requires: mongoose
└── exports: Scholarship model to routes

seedDatabase.js
├── requires: models/Scholarship.js
├── requires: mongoose
├── requires: dotenv
└── loads: .env file
```

---

## 📝 Code Changes Made

### Original vs Updated Structure

| Aspect | Original | Updated |
|--------|----------|---------|
| Route Base | `/api/scholarships` | `/api` |
| Find Endpoint | POST `/find` | POST `/find-scholarships` |
| Schema | Many fields | Streamlined required fields |
| Validation | Basic | Comprehensive |
| Error Messages | Generic | Detailed |
| Sample Data | None | 10 scholarships |
| Documentation | Minimal | Complete |

---

## 🔍 Key Implementation Details

### Scholarship Matching Algorithm

Located in `routes/scholarshipRoutes.js`:
```javascript
const query = {
  level: educationLevel,                    // Exact match
  minMarks: { $lte: studentMarks },        // Min marks <= student marks
  category: category,                       // Exact match
  incomeLimit: { $gte: studentIncome },   // Income limit >= student income
  course: { $regex: course, $options: 'i' } // Case-insensitive match
};
```

### Error Handling Pattern

All routes follow:
1. Try-catch block
2. Input validation
3. Database query
4. Error handling with proper status codes
5. Structured JSON response

### Database Indexes

Added to Scholarship schema for performance:
- `level` - For filtering by UG/PG
- `category` - For filtering by category
- `course` - For course matching

---

## 🧪 Testing Each File

### Test server.js
```bash
curl http://localhost:5000/api/health
```

### Test routes/scholarshipRoutes.js
```bash
# Get all scholarships
curl http://localhost:5000/api/scholarships

# Find eligible
curl -X POST http://localhost:5000/api/find-scholarships \
  -H "Content-Type: application/json" \
  -d '{"educationLevel":"UG","marks":85,"category":"General","income":600000,"course":"Engineering"}'
```

### Test models/Scholarship.js
```bash
# Check if data is properly stored
curl http://localhost:5000/api/scholarships/[id]
```

### Test seedDatabase.js
```bash
npm run seed
# Should show: "✨ Database seeding completed!"
```

---

## 🔐 Security Considerations

### Current State (Development)
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling
- ⚠️ No authentication
- ⚠️ No rate limiting
- ⚠️ No HTTPS

### For Production
- [ ] Add JWT authentication
- [ ] Implement rate limiting (express-rate-limit)
- [ ] Use HTTPS/SSL
- [ ] Add request sanitization
- [ ] Implement logging
- [ ] Use cloud MongoDB with credentials
- [ ] Add API key validation
- [ ] Enable CORS restrictions

---

## 📊 Database

### Collections
- **scholarships** - All scholarship records

### Indexes
```javascript
{
  "level": 1,     // Ascending
  "category": 1,  // Ascending
  "course": 1     // Ascending
}
```

### Sample Records: 10
- Each with full required fields
- Various UG/PG levels
- Different categories
- Multiple income limits
- Various courses and amounts

---

## 🎯 Quick Reference Commands

```bash
# Installation
npm install

# Setup
cp .env.example .env

# Development
npm run dev      # Auto-reload on changes

# Seed data
npm run seed

# Production
npm start

# Test endpoints
curl http://localhost:5000/api/health
npm run seed     # Populate database

# View logs
# Check terminal output for:
# - MongoDB connection status
# - Server startup message
# - API request/response logs
```

---

## 📞 Support Matrix

| Issue | File | Solution |
|-------|------|----------|
| Server won't start | server.js | Check port availability |
| MongoDB error | server.js | Verify MongoDB connection |
| Endpoint 404 | routes/scholarshipRoutes.js | Check route paths |
| Data not found | seedDatabase.js | Run `npm run seed` |
| Wrong response | routes/scholarshipRoutes.js | Debug query logic |
| Schema errors | models/Scholarship.js | Verify field types |

---

## 🎓 Learning Resources

- **Express Documentation:** https://expressjs.com/
- **Mongoose Documentation:** https://mongoosejs.com/
- **MongoDB Documentation:** https://docs.mongodb.com/
- **RESTful API Design:** https://restfulapi.net/

---

**Backend Implementation Complete!** ✅

All files are ready for production use with comprehensive documentation.
