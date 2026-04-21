import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header-section">
          <h1 className="main-title">🎓 Scholarship Finder</h1>
          <p className="subtitle">Find scholarships you are eligible for</p>
          <p className="description">
            Discover scholarship opportunities tailored to your academic profile and eligibility.
            Answer a few simple questions and we'll match you with scholarships you can apply for.
          </p>
        </div>

        <div className="cards-container">
          <div 
            className="scholarship-card ug-card"
            onClick={() => navigate('/form/UG')}
          >
            <div className="card-icon">📚</div>
            <h2>Undergraduate</h2>
            <p className="card-subtitle">After 12th</p>
            <p className="card-description">
              Find scholarships for undergraduate programs after completing your 12th grade
            </p>
            <button className="card-button">Explore UG Scholarships</button>
          </div>

          <div 
            className="scholarship-card pg-card"
            onClick={() => navigate('/form/PG')}
          >
            <div className="card-icon">🎯</div>
            <h2>Postgraduate</h2>
            <p className="card-subtitle">After UG</p>
            <p className="card-description">
              Discover scholarships for postgraduate studies and advanced degree programs
            </p>
            <button className="card-button">Explore PG Scholarships</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
