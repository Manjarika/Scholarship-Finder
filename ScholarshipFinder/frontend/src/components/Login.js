import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Simple password check (in production, this would be more secure)
    const adminPassword_correct = 'admin123'; // Change this to a more secure approach
    
    if (adminPassword === adminPassword_correct) {
      login('admin');
      setAdminPassword('');
      navigate('/admin');
    } else {
      setPasswordError('Invalid password. Please try again.');
      setAdminPassword('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Scholarship Finder</h1>
        <p className="login-subtitle">Admin Access</p>

        <div className="admin-login-form">
          <form onSubmit={handleAdminLogin}>
            <h2>Admin Login</h2>
            <p className="form-label">Enter admin password to access the admin panel</p>
            
            <input
              type="password"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
                setPasswordError('');
              }}
              required
              className={passwordError ? 'input-error' : ''}
              autoFocus
            />
            
            {passwordError && <p className="error-message">{passwordError}</p>}
            
            <div className="form-buttons">
              <button type="submit" className="submit-button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
