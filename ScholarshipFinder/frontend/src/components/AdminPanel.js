import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const API_BASE = '/api';

const AdminPanel = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
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

  // Handle Add button click
  const handleAddClick = () => {
    setIsAddMode(true);
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
    setShowModal(true);
  };

  // Handle Edit button click
  const handleEditClick = (scholarship) => {
    setIsAddMode(false);
    setEditingId(scholarship._id || scholarship.id);
    setFormData({ ...scholarship });
    setShowModal(true);
  };

  // Handle form submission (both add and edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      
      if (isAddMode) {
        // Add new scholarship
        response = await fetch(`${API_BASE}/scholarships/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        // Update existing scholarship
        response = await fetch(`${API_BASE}/scholarships/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (response.ok) {
        alert(isAddMode ? 'Scholarship added successfully!' : 'Scholarship updated successfully!');
        setShowModal(false);
        setEditingId(null);
        fetchScholarships(); // Refresh list
      } else {
        alert(isAddMode ? 'Failed to add scholarship' : 'Failed to update scholarship');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
    setIsAddMode(false);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
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
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel - Manage Scholarships</h1>
      
      <div className="add-button-container">
        <button onClick={handleAddClick} className="btn btn-primary btn-lg">+ Add New Scholarship</button>
      </div>

      {/* Display Scholarships */}
      <h2>All Scholarships</h2>
      {loading ? (
        <p>Loading...</p>
      ) : scholarships.length === 0 ? (
        <p>No scholarships found. Click "Add New Scholarship" to create one.</p>
      ) : (
        <div className="table-wrapper">
          <table className="scholarships-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Min Marks</th>
                <th>Category</th>
                <th>Income Limit</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Deadline</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship) => (
                <tr key={scholarship._id || scholarship.id}>
                  <td>{scholarship.scholarshipName}</td>
                  <td>{scholarship.level}</td>
                  <td>{scholarship.minMarks}</td>
                  <td>{scholarship.category}</td>
                  <td>{scholarship.incomeLimit}</td>
                  <td>{scholarship.course}</td>
                  <td>{scholarship.amount}</td>
                  <td>{scholarship.deadline}</td>
                  <td><a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">Link</a></td>
                  <td className="actions-cell">
                    <button onClick={() => handleEditClick(scholarship)} className="btn btn-sm btn-info">Edit</button>
                    <button onClick={() => handleDelete(scholarship._id || scholarship.id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isAddMode ? 'Add New Scholarship' : 'Edit Scholarship'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
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
              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">{isAddMode ? 'Add Scholarship' : 'Update Scholarship'}</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;