# 🎨 Scholarship Finder - Frontend

A modern, responsive React application for discovering scholarships. This guide covers setup, development, and integration with the backend API.

## 📋 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

## 📦 Installation & Setup

### Prerequisites
- **Node.js** v14 or higher
- **npm** or yarn
- **React** 18.2.0 (included in package.json)

### Step-by-Step Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The application will automatically open at **http://localhost:3000**

### Environment Configuration (Optional)

For backend API base URL (if different from localhost:5000):
```bash
# Create a .env file in frontend directory
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Home.js             # Home page component
│   │   ├── Home.css            # Home page styling
│   │   ├── StudentForm.js      # Student form component
│   │   ├── StudentForm.css     # Form styling
│   │   ├── ResultPage.js       # Results display component
│   │   └── ResultPage.css      # Results styling
│   ├── App.js                  # Main app component with routing
│   ├── App.css                 # App-level styling
│   ├── index.js                # React entry point
│   ├── index.css               # Global styles
│   └── package.json            # Dependencies and scripts
└── README.md                   # This file
```

---

## 🎨 Components Overview

### 1. **Home.js** - Landing Page
**Purpose:** Welcome page with category selection

**Features:**
- 🎓 Two scholarship category buttons:
  - "After 12th – UG Scholarships"
  - "After UG – PG Scholarships"
- 💝 Modern gradient design
- ✨ Smooth hover animations
- 📱 Fully responsive

**Props:** `Route` props for navigation

**Code Sample:**
```javascript
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  const handleUG = () => navigate('/form/UG');
  const handlePG = () => navigate('/form/PG');
}
```

---

### 2. **StudentForm.js** - Scholarship Finder Form
**Purpose:** Collect student details for scholarship matching

**Features:**
- 👤 Personal section: Name, Email, Phone
- 📊 Academic section: Marks, Category
- 💰 Financial section: Income, State
- ✨ Additional section: Optional fields
- ✅ Full form validation
- 📤 API integration with backend
- 🎯 Pre-selected education level

**Form Fields:**
```javascript
{
  fullName: String,
  email: String,
  phone: String,
  marks: Number,
  category: String,        // "General" | "OBC" | "SC" | "ST"
  income: Number,
  state: String,
  course: String,
  educationLevel: String   // "UG" or "PG" (pre-filled)
}
```

**API Integration:**
```javascript
// Makes POST request to backend
POST http://localhost:5000/api/find-scholarships

// Request body:
{
  educationLevel: form.educationLevel,
  marks: form.marks,
  category: form.category,
  income: form.income,
  course: form.course
}

// Response:
{
  success: true,
  count: 3,
  data: [...]  // Array of matching scholarships
}
```

**Flow:**
1. User selects UG/PG from Home
2. Form loads with pre-selected level
3. User fills in details and submits
4. Frontend validates input
5. Frontend sends POST to backend
6. Backend returns matching scholarships
7. Navigate to ResultPage with results

---

### 3. **ResultPage.js** - Search Results
**Purpose:** Display matching scholarships

**Features:**
- 🎓 Scholarship cards with all details
- 💰 Highlighted scholarship amount
- ⏰ Deadline in prominent red
- 🔗 Direct "Apply Now" links
- 📊 Results count
- 🔄 "New Search" button
- 🏠 "Back to Home" button
- 📱 Responsive grid layout

**Scholarship Card Display:**
```javascript
scholarshipName          // Scholarship title
level                   // UG/PG badge
minMarks               // Minimum marks required
category               // Eligibility category
incomeLimit            // Income limit
course                 // Course requirement
amount                 // Scholarship amount (highlighted)
deadline               // Application deadline (red)
provider               // Organization name
description            // Scholarship description
eligibility            // Eligibility criteria
duration               // Length of scholarship
applicationLink        // URL to apply
```

---

## 🎯 Page Flow

```
User
  ↓
[Home Page]
  ↓ (clicks UG or PG)
[Student Form] (with pre-filled level)
  ↓ (fills details and submits)
  ├─ Frontend validates input
  ├─ Sends POST to /api/find-scholarships
  └─ Backend processes and returns results
  ↓
[Result Page]  (displays matching scholarships)
  ↓
  ├─ [Apply Now] → Opens scholarship link
  ├─ [New Search] → Back to form
  └─ [Back to Home] → Home page
```

---

## 🎨 Styling Features

### Modern Design Elements
- **Gradients:** Purple to blue gradients for modern look
- **Animations:** Smooth transitions and hover effects
- **Colors:** 
  - Primary: Purple (#667eea)
  - Secondary: Blue (#764ba2)
  - Accent: Red (#f093fb)
  - Text: Dark gray/white for contrast
- **Typography:** Clean sans-serif fonts
- **Spacing:** Proper padding/margin for readability

### Responsive Breakpoints
```css
/* Mobile phones */
@media (max-width: 600px) {
  /* Stacked layout */
  flex-direction: column;
}

/* Tablets and small desktops */
@media (min-width: 601px) and (max-width: 1024px) {
  /* 2-column layout */
}

/* Large desktops */
@media (min-width: 1025px) {
  /* Full multi-column layout */
}
```

---

## 🚀 Development

### Available Scripts

```bash
# Start development server with live reload
npm start
# Opens http://localhost:3000

# Build for production
npm run build
# Creates optimized build in 'build/' directory

# Run tests (if configured)
npm test

# Eject configuration (not recommended)
npm run eject
```

### Development Mode
The application runs with:
- **React Fast Refresh** - Hot reload on file changes
- **Source Maps** - Easy debugging
- **Unminified Code** - Better error messages

### Browser DevTools
- Install **React Developer Tools** extension
- Use **Redux DevTools** for state inspection (if redux added)

---

## 🔌 Backend Integration

### API Base URL
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Main Endpoint Used
```javascript
// Find eligible scholarships
POST /api/find-scholarships

// Request format:
{
  educationLevel: "UG",     // Required: "UG" or "PG"
  marks: 85,                 // Required: 0-100
  category: "General",       // Required: "General"|"OBC"|"SC"|"ST"
  income: 600000,            // Required: family income in INR
  course: "Engineering"      // Required: course name
}

// Response format:
{
  success: true,
  count: 3,
  data: [
    {
      _id: "...",
      scholarshipName: "...",
      level: "UG",
      minMarks: 85,
      category: "General",
      incomeLimit: 800000,
      course: "Engineering",
      amount: "₹50,000 per year",
      deadline: "31-12-2024",
      applicationLink: "https://...",
      provider: "...",
      description: "...",
      eligibility: "...",
      duration: "4 years"
    }
  ]
}
```

### Error Handling
```javascript
try {
  const response = await fetch(`${API_URL}/find-scholarships`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    // Handle HTTP errors
    alert('Error: ' + response.status);
  }
  
  const result = await response.json();
  // Handle result
} catch (error) {
  // Handle network errors
  console.error('API Error:', error);
}
```

---

## 🧪 Testing

### Manual Testing Checklist

**Home Page:**
- [ ] Load http://localhost:3000
- [ ] "UG Scholarships" button works
- [ ] "PG Scholarships" button works
- [ ] Hover effects display correctly
- [ ] Responsive on mobile

**Student Form:**
- [ ] All form fields appear
- [ ] Education level is pre-filled
- [ ] Category dropdown has all options
- [ ] Form validation works
- [ ] Submit button sends data
- [ ] Loading state displays during API call

**Result Page:**
- [ ] Results display in cards
- [ ] "Apply Now" links work
- [ ] "New Search" button navigates back
- [ ] "Back to Home" button works
- [ ] No results message displays correctly

**API Integration:**
- [ ] Backend must be running on port 5000
- [ ] CORS errors should not appear
- [ ] API requests/responses in browser DevTools

---

## 🔍 Component Props

### Home Component
```javascript
// No props required
// Uses React Router (useNavigate)
```

### StudentForm Component
```javascript
// Via URL params:
params.level  // "UG" or "PG" from route

// Example route:
<Route path="/form/:level" element={<StudentForm />} />
```

### ResultPage Component
```javascript
// Via navigation state:
location.state  // {
//   success: boolean,
//   count: number,
//   data: Array<Scholarship>
// }
```

---

## 🐛 Troubleshooting

### Common Issues

**Port 3000 Already in Use**
```bash
# Kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**CORS Errors**
- Ensure backend is running on port 5000
- Backend must have CORS enabled
- Check API_URL in components matches backend

**Form Not Submitting**
- Check browser console for errors
- Verify all required fields are filled
- Backend must be running and accessible
- Check network tab for API response

**No Results Showing**
- Verify backend has sample data (run `npm run seed`)
- Check if student criteria match any scholarships
- Check backend logs for errors

---

## 🔐 Security Considerations

### Frontend Security
- ✅ Input validation on form submission
- ✅ Sanitize user input before sending to API
- ✅ Use HTTPS in production
- ✅ Never store sensitive data in localStorage
- ⚠️ API keys/secrets should never be in frontend code

### CORS Configuration
- Only accept requests from trusted domains
- Backend CORS should specify frontend URL in production
- Avoid using `*` for origins in production

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "react-scripts": "5.0.1"
}
```

### Dev Dependencies
```json
{
  "@tauri-apps/cli": "^1.2.0"
}
```

---

## 🚀 Building for Production

```bash
# Create optimized production build
npm run build

# This generates:
# - Minified JavaScript files
# - Optimized CSS
# - Asset optimization
# - Output in 'build/' directory

# Build is ready to deploy to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Traditional web host
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Backend API Docs](../backend/API_DOCUMENTATION.md)

---

## 📞 Support & Notes

### Integration with Backend
The frontend expects the backend to be running at `http://localhost:5000` with these endpoints:
- `POST /api/find-scholarships` - Find eligible scholarships
- Other CRUD endpoints available but not used in frontend

### Future Enhancements
- [ ] Add user authentication
- [ ] Save favorite scholarships
- [ ] Sort and filter results
- [ ] Download scholarship list as PDF
- [ ] Email results to user
- [ ] Admin panel to manage scholarships

---

**Last Updated:** 2024  
**Frontend Version:** 1.0.0  
**React Version:** 18.2.0
