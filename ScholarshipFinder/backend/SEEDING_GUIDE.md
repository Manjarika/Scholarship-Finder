# Scholarship Database Seeding Guide

This guide explains how to populate the Scholarship Finder database with sample scholarship data.

## Overview

We provide **two methods** to seed the database:

1. **Script Method** (For MongoDB) - Direct database seeding via `seedDatabase.js`
2. **API Method** (For Mock Database) - HTTP endpoint for testing without MongoDB

---

## Method 1: API Endpoint (Current Method - No MongoDB Required)

The easiest way to seed data without installing MongoDB.

### How to Use

**Step 1:** Ensure both backend and frontend are running:
```bash
# Terminal 1 - Backend (port 5000)
cd backend
node server.js

# Terminal 2 - Frontend (port 3000 or 3005)
cd frontend
npm start
```

**Step 2:** Seed the database via API POST request:
```bash
curl -X POST http://localhost:5000/api/seed
```

Or use your browser/Postman to POST to: `http://localhost:5000/api/seed`

**Step 3:** Expected Response:
```json
{
  "success": true,
  "count": 15,
  "message": "Successfully seeded database with 15 sample scholarships",
  "data": {
    "ugScholarships": 8,
    "pgScholarships": 7
  }
}
```

**Step 4:** Test the seeded data by using the scholarship finder form:
- Navigate to http://localhost:3000 (or 3005 if port conflict)
- Click "Undergraduate" or "Postgraduate"
- Fill in the form with test data
- Submit to see matching scholarships

---

## Method 2: MongoDB Seeding Script

For permanent database persistence using MongoDB.

### Prerequisites

1. **Install MongoDB**:
   - Windows: Download from https://www.mongodb.com/try/download/community
   - macOS: `brew install mongodb-community`
   - Linux: Follow MongoDB official docs

2. **Start MongoDB** (in a separate terminal):
   ```bash
   mongod
   ```

3. **Verify MongoDB Connection**:
   - Check that MongoDB is running on port 27017
   - Verify .env file has correct MONGODB_URI

### How to Use

**Step 1:** Navigate to backend directory:
```bash
cd backend
```

**Step 2:** Run the seed script:
```bash
npm run seed
```

OR manually:
```bash
node seedDatabase.js
```

**Step 3:** Expected Output:
```
✅ Connected to MongoDB
🗑️  Cleared existing scholarships
✅ Successfully inserted 15 sample scholarships

📚 Sample Scholarships:
1. Pragati Scholarship (UG)
2. National Merit Scholarship - Engineering (UG)
...
15. SC Category PG Award (PG)

✨ Database seeding completed!
```

---

## Sample Data Information

### Total Scholarships: 15

#### Undergraduate (UG) - 8 Scholarships
1. **Pragati Scholarship** - Engineering
2. **National Merit Scholarship** - Engineering  
3. **OBC Excellence Award** - Engineering
4. **SC/ST Scholarship** - Engineering
5. **Commerce Merit Scholarship** - Commerce
6. **Science Excellence Award** - Science
7. **ST Category Engineering Award** - Engineering
8. **Medicine Excellence Award** - Medicine
9. **Law Graduate Excellence Fund** - Law
10. **Arts & Humanities Merit Scholarship** - Arts

#### Postgraduate (PG) - 7 Scholarships
1. **Post Graduation Excellence Award** - Engineering
2. **Women Empowerment PG Scholarship** - Engineering
3. **MBA Merit Scholarship** - MBA
4. **OBC PG Research Fellowship** - Engineering
5. **SC Category PG Award** - Science

---

## Data Diversity

The sample data includes:

### By Category
- **General**: 8 scholarships
- **OBC**: 3 scholarships
- **SC**: 2 scholarships
- **ST**: 2 scholarships

### By Course
- **Engineering**: 7 scholarships (most popular)
- **Commerce**: 1 scholarship
- **Science**: 2 scholarships
- **Medicine**: 1 scholarship
- **Law**: 1 scholarship
- **Arts**: 1 scholarship
- **MBA**: 1 scholarship

### By Marks Range
- **Minimum**: 60 marks (SC/ST scholarships)
- **Average**: 75 marks
- **Maximum**: 90 marks (Medicine)

### By Income Limit
- **Minimum**: ₹450,000 (ST Category)
- **Average**: ₹750,000
- **Maximum**: ₹1,200,000 (MBA)

### By Amount
- **Minimum**: ₹35,000 (Arts)
- **Average**: ₹75,000
- **Maximum**: ₹150,000 (Medicine)

---

## Testing the Seeded Data

### Test Case 1: UG Engineering with 75% marks
```
Level: UG
Marks: 75
Category: General
Income: 600,000
Course: Engineering
```
**Expected Results**: 4 scholarships
- Pragati Scholarship
- National Merit Scholarship
- OBC Excellence Award (matches if OBC)
- SC/ST Scholarship (matches if SC)

### Test Case 2: PG Engineering with 80% marks
```
Level: PG
Marks: 80
Category: General
Income: 900,000
Course: Engineering
```
**Expected Results**: 2 scholarships
- Post Graduation Excellence Award
- Women Empowerment PG Scholarship

### Test Case 3: UG Medicine with 90% marks
```
Level: UG
Marks: 90
Category: General
Income: 1,000,000
Course: Medicine
```
**Expected Results**: 1 scholarship
- Medicine Excellence Award

---

## Troubleshooting

### Issue: API seed endpoint not working
**Solution**: 
- Ensure backend is running: `node server.js`
- Check port 5000 is accessible
- Try: `curl -X POST http://localhost:5000/api/seed` in terminal

### Issue: MongoDB connection failed
**Solution**:
- Start MongoDB service: `mongod`
- Verify MongoDB URI in .env file
- Check MongoDB is running on port 27017

### Issue: seedDatabase.js fails
**Solution**:
- Verify all dependencies installed: `npm install`
- Check MongoDB is running
- Review .env file for correct MONGODB_URI

### Issue: No scholarships appearing after seeding
**Solution** (for API method):
- The seed endpoint adds data to the mock array
- Data persists only while server is running
- Refresh the page and try the form again

---

## Resetting the Database

### For API Method (Mock Database)
Simply restart the server:
```bash
# Kill current process (Ctrl+C) and restart
node server.js
```

### For MongoDB
```bash
# Option 1: Run seed script again (clears and repopulates)
npm run seed

# Option 2: Manual MongoDB clear
# Connect to mongo shell and run:
# db.scholarships.deleteMany({})
```

---

## Adding Custom Scholarships

### Via MongoDB (Permanent)
Edit `seedDatabase.js` and add to the `sampleScholarships` array:
```javascript
{
  scholarshipName: 'Your Scholarship Name',
  level: 'UG',
  minMarks: 70,
  category: 'General',
  incomeLimit: 800000,
  course: 'Your Course',
  amount: '₹50,000',
  deadline: '31 December 2026',
  applicationLink: 'https://example.com/apply',
  provider: 'Provider Name',
  description: 'Description',
  eligibility: 'Eligibility criteria',
  duration: '4 Years',
}
```

Then run: `npm run seed`

### Via API (Temporary)
Modify the `seedData` array in `server.js` at the `/api/seed` POST endpoint, then call the endpoint.

---

## Field Descriptions

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| scholarshipName | String | "Pragati Scholarship" | Name of the scholarship |
| level | String | "UG" or "PG" | Education level |
| minMarks | Number | 70 | Minimum marks required (0-100) |
| category | String | "General", "OBC", "SC", "ST" | Student category |
| incomeLimit | Number | 800000 | Maximum annual family income in INR |
| course | String | "Engineering" | Course/stream eligibility |
| amount | String | "₹50,000" | Scholarship amount per year/total |
| deadline | String | "30 June 2026" | Application deadline |
| applicationLink | String | "https://..." | External application URL |
| provider | String | "Government of India" | Scholarship provider |
| description | String | "Merit-based..." | Brief description |
| eligibility | String | "Class 12 pass..." | Detailed eligibility criteria |
| duration | String | "4 Years" | Scholarship duration |

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs: `npm start` shows detailed errors
3. Check frontend console (F12 → Console tab)
4. Verify all required fields are present in scholarship data
