# Scholarship Finder Backend

A robust Node.js/Express backend API for managing scholarships and helping students find eligible opportunities based on their profile.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Seeding Data](#seeding-data)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

✅ **Scholarship Management**
- Create, read, update, and delete scholarships
- Manage scholarship details and eligibility criteria

✅ **Smart Matching Algorithm**
- Find scholarships based on student profile
- Match on education level, marks, category, income, and course
- Return eligible scholarships sorted by amount

✅ **RESTful API**
- Well-organized endpoints
- Consistent JSON responses
- Proper HTTP status codes
- Error handling

✅ **Database Integration**
- MongoDB integration with Mongoose
- Indexed queries for performance
- Timestamped records

✅ **Developer Friendly**
- Clear code structure
- Comprehensive documentation
- Sample data seeding
- Development mode with auto-reload

---

## 🛠 Tech Stack

- **Runtime:** Node.js v14+
- **Framework:** Express.js v4.18+
- **Database:** MongoDB v4.4+
- **ODM:** Mongoose v7.0+
- **CORS:** cors v2.8+
- **Env Management:** dotenv v16.0+
- **Dev Tools:** nodemon v2.0+

---

## 📁 Project Structure

```
backend/
├── models/
│   └── Scholarship.js          # Mongoose scholarship schema
├── routes/
│   └── scholarshipRoutes.js    # API route handlers
├── server.js                   # Express server setup
├── seedDatabase.js             # Database seeding script
├── package.json                # Dependencies & scripts
├── .env                        # Environment variables
├── .env.example                # Example env file
├── README.md                   # This file
└── API_DOCUMENTATION.md        # Detailed API docs
```

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or above)
- npm or yarn
- MongoDB (local or cloud instance)

### Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your MongoDB URI:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/scholarshipFinder
   PORT=5000
   NODE_ENV=development
   ```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/scholarshipFinder

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### MongoDB Setup

**Local MongoDB:**
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Cloud MongoDB (MongoDB Atlas):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

---

## 🚀 Running the Server

### Start Server (Production)
```bash
npm start
```

**Output:**
```
✅ Connected to MongoDB successfully
🚀 Scholarship Finder Backend Server is running on port 5000
📍 Environment: development
🗄️  MongoDB: mongodb://localhost:27017/scholarshipFinder
```

### Start Server (Development with Auto-reload)
```bash
npm run dev
```

Uses `nodemon` to automatically restart on file changes.

### Verify Server is Running
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-11T10:30:00.000Z"
}
```

---

## 🔌 API Endpoints

### Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/scholarships` | Get all scholarships |
| POST | `/api/find-scholarships` | Find eligible scholarships |
| GET | `/api/scholarships/:id` | Get specific scholarship |
| POST | `/api/scholarships/create` | Create new scholarship |
| PUT | `/api/scholarships/:id` | Update scholarship |
| DELETE | `/api/scholarships/:id` | Delete scholarship |

### Main Endpoint: Find Eligible Scholarships

**POST** `/api/find-scholarships`

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
      "deadline": "2026-06-30",
      "applicationLink": "...",
      "provider": "Government of India",
      "description": "...",
      "eligibility": "...",
      "duration": "4 Years"
    }
  ],
  "message": "Found 3 eligible scholarship(s)"
}
```

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🗄️ Database

### Scholarship Model

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| scholarshipName | String | ✓ | Name of the scholarship |
| level | String | ✓ | "UG" or "PG" |
| minMarks | Number | ✓ | Minimum marks required (0-100) |
| category | String | ✓ | "General", "OBC", "SC", or "ST" |
| incomeLimit | Number | ✓ | Maximum family income allowed |
| course | String | ✓ | Course name (e.g., "Engineering") |
| amount | String | ✓ | Scholarship amount (e.g., "₹50,000") |
| deadline | String | ✓ | Application deadline date |
| applicationLink | String | ✓ | URL to apply |
| provider | String | Optional | Organization providing scholarship |
| description | String | Optional | Detailed description |
| eligibility | String | Optional | Eligibility criteria |
| duration | String | Optional | Scholarship duration |

### Indexes
- `level` (indexed for faster queries)
- `category` (indexed for faster queries)
- `course` (indexed for faster queries)

---

## 🌱 Seeding Data

### Seed Sample Data
```bash
npm run seed
```

This will:
1. Connect to MongoDB
2. Clear existing scholarships
3. Insert 10 sample scholarships
4. Display inserted data
5. Exit gracefully

**Sample Data Includes:**
- Engineering scholarships (UG & PG)
- Commerce scholarships
- Science scholarships
- Multiple categories (General, OBC, SC, ST)
- Various income limits
- Different courses

---

## 👨‍💻 Development

### Project File Structure

**models/Scholarship.js**
- Defines MongoDB schema
- Field validation
- Timestamps

**routes/scholarshipRoutes.js**
- Route handlers for all endpoints
- Input validation
- Error handling
- Database queries

**server.js**
- Express app setup
- Middleware configuration
- MongoDB connection
- Route mounting
- Error handling

**seedDatabase.js**
- Sample data definition
- Seeding logic
- Database operations

### Code Style

- Clean, modular code
- Proper error handling
- Descriptive variable names
- Comments for complex logic
- Consistent formatting

### Adding New Features

1. **Create route handler** in `routes/scholarshipRoutes.js`
2. **Add schema changes** if needed in `models/Scholarship.js`
3. **Update documentation** in `API_DOCUMENTATION.md`
4. **Test endpoint** using Postman or cURL

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error connecting to MongoDB: connect ECONNREFUSED
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is listening on correct port

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
- Run `npm install` in backend directory
- Ensure you're in backend folder

### Invalid Request Body
```json
{
  "success": false,
  "message": "Missing required fields: ..."
}
```
**Solution:**
- Verify all required fields are included
- Check field names are correct
- Use `Content-Type: application/json` header

### No Scholarships Found
```json
{
  "success": true,
  "count": 0,
  "data": [],
  "message": "No scholarships found matching your criteria"
}
```
**Solution:**
- Run `npm run seed` to populate database
- Verify eligibility criteria
- Check if course name matches exactly

---

## 📊 Performance Tips

1. **Database Indexes:** Queries are indexed on `level`, `category`, and `course` for faster lookups
2. **Response Sorting:** Results sorted by amount (highest first)
3. **Case-Insensitive Search:** Course matching is case-insensitive
4. **Error Handling:** Proper error messages for debugging

---

## 🔒 Security Considerations

For production deployment:
- [ ] Add authentication (JWT tokens)
- [ ] Implement rate limiting
- [ ] Add input sanitization
- [ ] Enable HTTPS
- [ ] Add request validation middleware
- [ ] Implement logging & monitoring
- [ ] Add CORS restrictions
- [ ] Use environment variables for secrets

---

## 📝 License
ISC

---

## 👥 Support

For issues or questions:
1. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API info
2. Review example requests in troubleshooting section
3. Check MongoDB and Node.js versions
4. Ensure all dependencies are installed

---

## 🎉 Next Steps

1. ✅ Start the backend server
2. ✅ Seed sample data: `npm run seed`
3. ✅ Test endpoints using Postman or cURL
4. ✅ Integrate with frontend application
5. ✅ Deploy to production (optional)

---

**Version:** 1.0.0  
**Last Updated:** March 11, 2026
