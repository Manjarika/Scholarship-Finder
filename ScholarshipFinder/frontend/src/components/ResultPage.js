import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const scholarships = location.state?.scholarships || [];

  return (
    <div className="result-page-container">
      <div className="result-wrapper">
        <div className="result-header">
          <h1>🎉 Your Matching Scholarships</h1>
          {scholarships.length > 0 && (
            <p className="result-count">Found <span className="count-num">{scholarships.length}</span> scholarship(s) for you</p>
          )}
        </div>
        
        {scholarships.length > 0 ? (
          <>
            <div className="scholarships-grid">
              {scholarships.map((scholarship) => (
                <div key={scholarship._id} className="scholarship-card">
                  <div className="card-header">
                    <h3 className="scholarship-name">{scholarship.scholarshipName}</h3>
                    <span className="scholarship-type">{scholarship.level === 'UG' ? 'Undergraduate' : 'Postgraduate'}</span>
                  </div>
                  
                  <div className="card-body">
                    {scholarship.course && (
                      <div className="info-item">
                        <span className="info-label">📖 Course</span>
                        <span className="info-value">{scholarship.course}</span>
                      </div>
                    )}
                    
                    <div className="info-item">
                      <span className="info-label">💰 Scholarship Amount</span>
                      <span className="info-value amount">{scholarship.amount}</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">📊 Minimum Marks Required</span>
                      <span className="info-value">{scholarship.minMarks}%</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">👨‍👩‍👧 Eligible Category</span>
                      <span className="info-value">{scholarship.category}</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-label">💼 Income Limit</span>
                      <span className="info-value">₹{scholarship.incomeLimit?.toLocaleString() || 'No limit'}</span>
                    </div>
                    
                    {scholarship.provider && (
                      <div className="info-item">
                        <span className="info-label">🏢 Provider</span>
                        <span className="info-value">{scholarship.provider}</span>
                      </div>
                    )}
                    
                    {scholarship.duration && (
                      <div className="info-item">
                        <span className="info-label">⏱ Duration</span>
                        <span className="info-value">{scholarship.duration}</span>
                      </div>
                    )}
                    
                    {scholarship.deadline && (
                      <div className="info-item">
                        <span className="info-label">📅 Application Deadline</span>
                        <span className="info-value deadline">{scholarship.deadline}</span>
                      </div>
                    )}
                    
                    {scholarship.eligibility && (
                      <div className="info-item full-width">
                        <span className="info-label">✅ Eligibility Criteria</span>
                        <p className="info-text">{scholarship.eligibility}</p>
                      </div>
                    )}
                    
                    {scholarship.description && (
                      <div className="info-item full-width">
                        <span className="info-label">📝 Description</span>
                        <p className="info-text">{scholarship.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="card-footer">
                    <a 
                      href={scholarship.applicationLink || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-apply"
                    >
                      ➜ Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No Scholarships Found</h3>
            <p>Unfortunately, no scholarships were found matching your criteria.</p>
            <p className="no-results-suggestion">Try adjusting your details or check back later for new scholarships.</p>
          </div>
        )}

        <div className="result-actions">
          <button className="btn-home" onClick={() => navigate('/')}>
            🏠 Back to Home
          </button>
          <button className="btn-search-again" onClick={() => navigate('/form/UG')}>
            🔄 New Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
