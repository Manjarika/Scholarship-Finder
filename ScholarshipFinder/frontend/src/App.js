import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import StudentForm from './components/StudentForm';
import ResultPage from './components/ResultPage';
import AdminPanel from './components/AdminPanel'; // Added import for AdminPanel

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1 className="navbar-title">Scholarship Finder</h1>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form/:level" element={<StudentForm />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/admin" element={<AdminPanel />} /> {/* Added route for AdminPanel */}
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Scholarship Finder. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
