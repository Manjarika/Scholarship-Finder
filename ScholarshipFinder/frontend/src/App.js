import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './components/Home';
import StudentForm from './components/StudentForm';
import ResultPage from './components/ResultPage';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

import './App.css';

function ProtectedAdminRoute() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <AdminPanel />;
}

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="navbar-title">Scholarship Finder</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {isAuthenticated && user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          {isAuthenticated && (
            <button onClick={logout} className="logout-btn">
              Logout (Admin)
            </button>
          )}
          {!isAuthenticated && <Link to="/login">Admin Login</Link>}
        </div>
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/form/:level" element={<StudentForm />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Scholarship Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
