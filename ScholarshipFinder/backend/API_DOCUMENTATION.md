# Scholarship Finder Backend API Documentation

## Overview
The Scholarship Finder Backend is a Node.js/Express API that manages scholarship data and provides endpoints for finding eligible scholarships based on student criteria.

## Base URL
```
http://localhost:5000/api
```

## Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/scholarshipFinder
PORT=5000
NODE_ENV=development
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation Steps
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Seed sample data (optional)
npm run seed

# Start the server
npm start

# For development with auto-reload
npm run dev
```

---

## API Endpoints

### 1. Health Check
**Endpoint:** `GET /api/health`

**Description:** Verify if the server is running

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-11T10:30:00.000Z"
}
```

---

### 2. Get All Scholarships
**Endpoint:** `GET /api/scholarships`

**Description:** Returns all scholarships available in the database

**Response:**
```json
{
  "success": true,
  "count": 10,
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
    // ... more scholarships
  ]
}
```

**Status Codes:**
- `200 OK` - Scholarships retrieved successfully
- `500 Internal Server Error` - Database error

---

### 3. Find Eligible Scholarships (Main Endpoint)
**Endpoint:** `POST /api/find-scholarships`

**Description:** Find scholarships matching student's eligibility criteria

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

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `educationLevel` | String | Yes | "UG" or "PG" |
| `marks` | Number | Yes | Student's percentage/marks (0-100) |
| `category` | String | Yes | "General", "OBC", "SC", or "ST" |
| `income` | Number | Yes | Annual family income in INR |
| `course` | String | Yes | Course name (e.g., "Engineering", "Commerce") |

**Eligibility Criteria:**
The API returns scholarships where ALL of the following are true:
- `scholarshipLevel === educationLevel`
- `scholarshipMinMarks <= studentMarks`
- `scholarshipCategory === studentCategory`
- `scholarshipIncomeLimit >= studentIncome`
- `scholarshipCourse` matches `studentCourse` (case-insensitive)

**Response (Success):**
```json
{
  "success": true,
  "count": 3,
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
      "duration": "4 Years"
    }
    // ... more eligible scholarships
  ],
  "message": "Found 3 eligible scholarship(s)"
}
```

**Response (No Results):**
```json
{
  "success": true,
  "count": 0,
  "data": [],
  "message": "No scholarships found matching your criteria"
}
```

**Response (Invalid Request):**
```json
{
  "success": false,
  "message": "Missing required fields: educationLevel, marks, category, income, course"
}
```

**Status Codes:**
- `200 OK` - Scholarships found (may be empty)
- `400 Bad Request` - Missing or invalid parameters
- `500 Internal Server Error` - Database error

**Example cURL Request:**
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

---

### 4. Get Scholarship by ID
**Endpoint:** `GET /api/scholarships/:id`

**Description:** Get details of a specific scholarship

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | MongoDB ObjectId of the scholarship |

**Response (Success):**
```json
{
  "success": true,
  "data": {
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
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "Scholarship not found"
}
```

**Status Codes:**
- `200 OK` - Scholarship found
- `404 Not Found` - Scholarship with given ID does not exist
- `500 Internal Server Error` - Database error

---

### 5. Create Scholarship (Admin)
**Endpoint:** `POST /api/scholarships/create`

**Description:** Create a new scholarship (for administrative use)

**Request Body:**
```json
{
  "scholarshipName": "New Merit Scholarship",
  "level": "UG",
  "minMarks": 80,
  "category": "General",
  "incomeLimit": 700000,
  "course": "Engineering",
  "amount": "₹45,000 per year",
  "deadline": "2026-12-31",
  "applicationLink": "https://scholarships.example.com/apply",
  "provider": "XYZ Foundation",
  "description": "Scholarship for meritorious engineering students",
  "eligibility": "Class 12 pass with minimum 80% marks",
  "duration": "4 Years"
}
```

**Required Fields:**
- `scholarshipName`, `level`, `minMarks`, `category`, `incomeLimit`, `course`, `amount`, `deadline`, `applicationLink`

**Response (Success):**
```json
{
  "success": true,
  "message": "Scholarship created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "scholarshipName": "New Merit Scholarship",
    "level": "UG",
    "minMarks": 80,
    "category": "General",
    "incomeLimit": 700000,
    "course": "Engineering",
    "amount": "₹45,000 per year",
    "deadline": "2026-12-31",
    "applicationLink": "https://scholarships.example.com/apply",
    "provider": "XYZ Foundation",
    "description": "Scholarship for meritorious engineering students",
    "eligibility": "Class 12 pass with minimum 80% marks",
    "duration": "4 Years",
    "createdAt": "2026-03-11T11:00:00.000Z",
    "updatedAt": "2026-03-11T11:00:00.000Z"
  }
}
```

**Status Codes:**
- `201 Created` - Scholarship created successfully
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - Database error

---

### 6. Update Scholarship
**Endpoint:** `PUT /api/scholarships/:id`

**Description:** Update an existing scholarship

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | MongoDB ObjectId of the scholarship |

**Request Body:** (All fields optional)
```json
{
  "scholarshipName": "Updated Scholarship Name",
  "minMarks": 85,
  "incomeLimit": 750000,
  "deadline": "2026-12-31"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Scholarship updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "scholarshipName": "Updated Scholarship Name",
    // ... updated scholarship data
  }
}
```

**Status Codes:**
- `200 OK` - Scholarship updated successfully
- `404 Not Found` - Scholarship not found
- `500 Internal Server Error` - Database error

---

### 7. Delete Scholarship
**Endpoint:** `DELETE /api/scholarships/:id`

**Description:** Delete a scholarship

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | MongoDB ObjectId of the scholarship |

**Response (Success):**
```json
{
  "success": true,
  "message": "Scholarship deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "scholarshipName": "Deleted Scholarship",
    // ... deleted scholarship data
  }
}
```

**Status Codes:**
- `200 OK` - Scholarship deleted successfully
- `404 Not Found` - Scholarship not found
- `500 Internal Server Error` - Database error

---

## Database Schema

### Scholarship Model
```javascript
{
  scholarshipName: String (required),
  level: String (enum: ['UG', 'PG'], required),
  minMarks: Number (required, 0-100),
  category: String (enum: ['General', 'OBC', 'SC', 'ST'], required),
  incomeLimit: Number (required),
  course: String (required),
  amount: String (required),
  deadline: String (required),
  applicationLink: String (required),
  provider: String,
  description: String,
  eligibility: String,
  duration: String,
  createdAt: Date (default: now),
  updatedAt: Date (auto-updated)
}
```

---

## Sample Data

To populate the database with sample scholarships, run:
```bash
npm run seed
```

This will insert 10 sample scholarships covering different categories, levels, and courses.

---

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (only in development)"
}
```

**Common Error Codes:**
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Testing the API

### Using Postman
1. Create a new collection for "Scholarship Finder"
2. Set base URL: `http://localhost:5000/api`
3. Create requests for each endpoint

### Using cURL

**Get all scholarships:**
```bash
curl http://localhost:5000/api/scholarships
```

**Find eligible scholarships:**
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

**Get scholarship by ID:**
```bash
curl http://localhost:5000/api/scholarships/507f1f77bcf86cd799439011
```

---

## Frontend Integration

The frontend can use the `/api/find-scholarships` endpoint like this:

```javascript
const response = await fetch('http://localhost:5000/api/find-scholarships', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    educationLevel: 'UG',
    marks: 85,
    category: 'General',
    income: 600000,
    course: 'Engineering'
  }),
});

const data = await response.json();
if (data.success) {
  console.log('Found scholarships:', data.data);
} else {
  console.error('Error:', data.message);
}
```

---

## Rate Limiting & Best Practices

- The API is currently open to all requests
- In production, consider implementing:
  - Rate limiting
  - Authentication & Authorization
  - Input validation & sanitization
  - Logging & monitoring

---

## Support & Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`

**Port Already in Use:**
- Change `PORT` in `.env`
- Or kill existing process: `lsof -ti:5000 | xargs kill -9`

**Missing Dependencies:**
- Run `npm install` in backend directory

---

## License
ISC

---

## Version History

### v1.0.0 (2026-03-11)
- Initial release
- Implemented all core endpoints
- Added sample data seeding
- Created comprehensive API documentation
