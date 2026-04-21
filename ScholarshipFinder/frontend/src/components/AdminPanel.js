import React, { useState, useEffect } from 'react';

const API_BASE = '/api';

const AdminPanel = () => {
  const [scholarships, setScholarships] = useState([]);
  const [formData, setFormData] = useState({
    scholarshipName: '',
    level: 'UG',
    minMarks: '',
    category: 'General',
    incomeLimit: '',
    course: '',
    amount: '',
    deadline: '',
    applicationLink: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch scholarships on component mount
  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await fetch(`${API_BASE}/scholarships`);
      const data = await response.json();
      console.log('Fetched scholarships:', data);
      setScholarships(data.data || data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to add scholarship
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/scholarships/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Scholarship added successfully!');
        setFormData({
          scholarshipName: '',
          level: 'UG',
          minMarks: '',
          category: 'General',
          incomeLimit: '',
          course: '',
          amount: '',
          deadline: '',
          applicationLink: ''
        });
        fetchScholarships(); // Refresh list
      } else {
        alert('Failed to add scholarship');
      }
    } catch (error) {
      console.error('Error adding scholarship:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/scholarships/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Scholarship deleted successfully!');
        fetchScholarships(); // Refresh list
      } else {
        alert('Failed to delete scholarship');
      }
    } catch (error) {
      console.error('Error deleting scholarship:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Panel</h1>
      
      {/* Add Scholarship Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Add Scholarship</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <input type="text" name="scholarshipName" placeholder="Scholarship Name" value={formData.scholarshipName} onChange={handleChange} required />
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
          <input type="number" name="minMarks" placeholder="Min Marks" value={formData.minMarks} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="All">All</option>
          </select>
          <input type="number" name="incomeLimit" placeholder="Income Limit" value={formData.incomeLimit} onChange={handleChange} required />
          <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} required />
          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
          <input type="url" name="applicationLink" placeholder="Application Link" value={formData.applicationLink} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Add Scholarship</button>
      </form>

      {/* Display Scholarships */}
      <h2>All Scholarships</h2>
      {loading ? (
        <p>Loading...</p>
      ) : scholarships.length === 0 ? (
        <p>No scholarships found. Check console for debug info.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Level</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Min Marks</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Category</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Income Limit</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Course</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Amount</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Deadline</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Link</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship) => (
              <tr key={scholarship._id || scholarship.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.scholarshipName}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.level}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.minMarks}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.category}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.incomeLimit}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.course}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.amount}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{scholarship.deadline}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}><a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">Link</a></td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <button onClick={() => handleDelete(scholarship._id || scholarship.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;