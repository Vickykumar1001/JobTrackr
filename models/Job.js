const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Applied', 'Round-1', 'Round-2', 'Interview', 'Declined',],
      default: 'Applied',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Internship', 'Freelance'],
      default: 'Full-time',
    },
    jobLocation: {
      type: String,
      default: 'My city',
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    salary: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
    },
    source: {
      type: String,
      maxlength: 50,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
