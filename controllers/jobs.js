const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const mongoose = require('mongoose');
const moment = require('moment');
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  // protected route
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // add stuff based on condition

  if (status && status !== 'All') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'All') {
    queryObject.jobType = jobType;
  }

  // NO AWAIT

  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === 'Latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'Oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'A-Z') {
    result = result.sort('position');
  }
  if (sort === 'Z-A') {
    result = result.sort('-position');
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()
}
const showStats = async (req, res) => {
  // Total applications and status counts
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: '$status', // Group by the status field
        count: { $sum: 1 } // Count the number of applications in each status
      }
    }
  ]);

  // Convert stats array to an object for easier access
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  // Create a defaultStats object with counts for each status
  const defaultStats = {
    totalApplications: (stats.Applied || 0) + (stats['Round-1'] || 0) + (stats['Round-2'] || 0) + (stats.Interview || 0) + (stats.Declined || 0) + (stats.Offered || 0),
    pending: stats.Applied || 0,
    round: stats['Round-1'] + stats['Round-2'] || 0,
    interview: stats.Interview || 0,
    declined: stats.Declined || 0,
    offered: stats.Offered || 0,
  };

  // Get monthly applications
  try {
    // Fetch monthly application stats for the current user
    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 10 },
    ]);

    // Map and format the aggregated results for better readability
    monthlyApplications = monthlyApplications.map(({ _id: { year, month }, count }) => {
      const formattedDate = moment()
        .month(month - 1)  // moment months are zero-indexed
        .year(year)
        .format('MMM YYYY'); // Use 'MMM YYYY' for a clearer year format
      return { date: formattedDate, count };
    }).reverse(); // Reverse to have chronological order

    // Handle cases where there are no applications for a month
    const allMonths = Array.from({ length: 12 }, (_, i) => moment().subtract(i, 'months').format('MMM YYYY'));
    const monthlyData = allMonths.map(month => {
      const found = monthlyApplications.find(app => app.date === month);
      return found ? found : { date: month, count: 0 }; // Default to 0 if no applications
    }).reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications: monthlyData });
  } catch (error) {
    // Handle errors appropriately
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching stats' });
  }
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
}
