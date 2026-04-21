# Quick Start Guide - Backend Setup

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup MongoDB
```bash
# Start MongoDB (in another terminal)
mongod
```

### Step 3: Create .env File
```bash
# Copy example env file
cp .env.example .env

# Edit .env if needed (optional)
# MONGODB_URI=mongodb://localhost:27017/scholarshipFinder
# PORT=5000
```

### Step 4: Seed Sample Data
```bash
npm run seed
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing scholarships
✅ Successfully inserted 10 sample scholarships

📚 Sample Scholarships:
1. National Merit Scholarship (UG)
2. Star Family Scholarship (UG)
... (more scholarships)

✨ Database seeding completed!
```

### Step 5: Start Backend Server
```bash
npm start
```

**Expected Output:**
```
✅ Connected to MongoDB successfully
🚀 Scholarship Finder Backend Server is running on port 5000
📍 Environment: development
🗄️  MongoDB: mongodb://localhost:27017/scholarshipFinder
```

---

## ✅ Verify Backend is Working

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Test Get All Scholarships
```bash
curl http://localhost:5000/api/scholarships
```

### Test Find Eligible Scholarships
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

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "scholarshipName": "National Merit Scholarship",
      "level": "UG",
      "minMarks": 85,
      "category": "General",
      ...
    }
  ],
  "message": "Found 2 eligible scholarship(s)"
}
```

---

## 📚 API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Check if server is running |
| `/api/scholarships` | GET | Get all scholarships |
| `/api/find-scholarships` | POST | **Find eligible scholarships** |
| `/api/scholarships/:id` | GET | Get specific scholarship |
| `/api/scholarships/create` | POST | Create new scholarship |
| `/api/scholarships/:id` | PUT | Update scholarship |
| `/api/scholarships/:id` | DELETE | Delete scholarship |

---

## 🔍 Request/Response Examples

### Find Eligible Scholarships (Main Endpoint)

**Request:**
```bash
POST http://localhost:5000/api/find-scholarships
Content-Type: application/json

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
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "scholarshipName": "National Merit Scholarship",
      "level": "UG",
      "minMarks": 85,
      "category": "General",
      "incomeLimit": 800000,
      "course": "Engineering",
      "amount": "₹50,000 per year",
      "deadline": "2026-06-30",
      "applicationLink": "https://scholarships.gov.in/nmsugenscheme",
      "provider": "Government of India",
      "description": "Merit-based scholarship for outstanding engineering students",
      "eligibility": "Class 12 pass with minimum 85% marks",
      "duration": "4 Years",
      "createdAt": "2026-03-11T10:00:00.000Z",
      "updatedAt": "2026-03-11T10:00:00.000Z"
    }
  ],
  "message": "Found 2 eligible scholarship(s)"
}
```

---

## 🚨 Common Issues & Solutions

### ❌ "MongoDB connection failed"
```
Solution: Make sure MongoDB is running
mongod
```

### ❌ "Port 5000 already in use"
```
Solution: Change PORT in .env or kill the process
lsof -ti:5000 | xargs kill -9
```

### ❌ "Module not found: express"
```
Solution: Install dependencies
npm install
```

### ❌ "No scholarships found"
```
Solution: Seed the database
npm run seed
```

---

## 📱 Frontend Connection

Update frontend API calls to use:
```
http://localhost:5000/api
```

Example:
```javascript
const response = await fetch('http://localhost:5000/api/find-scholarships', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    educationLevel: 'UG',
    marks: 85,
    category: 'General',
    income: 600000,
    course: 'Engineering'
  })
});

const data = await response.json();
console.log(data);
```

---

## 🎯 Next Steps

1. ✅ Backend running on `http://localhost:5000`
2. ✅ Database populated with sample data
3. ⬜ Start frontend in another terminal: `npm start` (from frontend folder)
4. ⬜ Visit `http://localhost:3000`
5. ⬜ Test the application end-to-end

---

## 📖 Documentation

- **Detailed API Docs:** See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Backend README:** See [README_BACKEND.md](./README_BACKEND.md)
- **Database Schema:** See [models/Scholarship.js](./models/Scholarship.js)

---

## 🆘 Need Help?

**Check logs for errors:**
```bash
# Backend logs will show:
# - MongoDB connection status
# - Server startup message
# - API errors (if any)
```

**Test with Postman:**
1. Create new request
2. Set method to POST
3. URL: `http://localhost:5000/api/find-scholarships`
4. Header: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "educationLevel": "UG",
  "marks": 85,
  "category": "General",
  "income": 600000,
  "course": "Engineering"
}
```

---

✨ **Your backend is ready!** Start the frontend and test the full application.
