import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentForm.css';

function StudentForm() {
  const { level } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    marks: '',
    category: '',
    income: '',
    course: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.marks || !formData.category || !formData.income || !formData.course) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);

    try {
      const requestData = {
        educationLevel: level,
        marks: parseInt(formData.marks),
        category: formData.category,
        income: parseInt(formData.income),
        course: formData.course,
      };

      console.log('Sending request to backend:', requestData);

      const response = await fetch('http://localhost:5000/api/find-scholarships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to find scholarships');
      }

      navigate('/results', { state: { scholarships: data.data || [] } });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to find scholarships: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <div className="form-icon">{level === 'UG' ? '📚' : '🎓'}</div>
          <h1>{level === 'UG' ? 'Undergraduate Scholarships' : 'Postgraduate Scholarships'}</h1>
          <p className="form-subtitle">Fill in your details to find matching scholarships</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">👤 Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="form-section">
            <h3 className="section-title">📊 Academic Information</h3>
            
            <div className="form-group">
              <label htmlFor="marks">Marks Obtained *</label>
              <input
                type="number"
                id="marks"
                name="marks"
                placeholder="Enter your marks (0-100)"
                value={formData.marks}
                onChange={handleChange}
                min="0"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select your category</option>
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="course">Course / Stream *</label>
              <input
                type="text"
                id="course"
                name="course"
                placeholder="e.g., Engineering, Medicine, Commerce"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="form-section">
            <h3 className="section-title">💰 Financial Information</h3>
            
            <div className="form-group">
              <label htmlFor="income">Annual Family Income (in INR) *</label>
              <input
                type="number"
                id="income"
                name="income"
                placeholder="e.g., 500000 for 5,00,000"
                value={formData.income}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Searching Scholarships...' : '🔍 Find Scholarships'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;

