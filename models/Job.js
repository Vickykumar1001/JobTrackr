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
      required: true,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    salaryRange: {
      type: String,
      maxlength: 50,
    },
    contact: {
      name: {
        type: String,
        maxlength: 100,
      },
      email: {
        type: String,
        match: /.+\@.+\..+/,
      },
      phone: {
        type: String,
        maxlength: 20,
      },
    },
    applicationSource: {
      type: String,
      maxlength: 50,
    },
    interviewRounds: [
      {
        date: Date,
        feedback: {
          type: String,
          maxlength: 500,
        }
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
