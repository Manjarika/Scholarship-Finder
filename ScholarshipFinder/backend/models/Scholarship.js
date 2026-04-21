const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema(
  {
    scholarshipName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    level: {
      type: String,
      enum: ['UG', 'PG'],
      required: true,
      index: true,
    },
    minMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      enum: ['General', 'OBC', 'SC', 'ST'],
      required: true,
      index: true,
    },
    incomeLimit: {
      type: Number,
      required: true,
      min: 0,
    },
    course: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    amount: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    applicationLink: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    eligibility: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
