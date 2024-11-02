import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaRupeeSign, FaMailBulk, FaStickyNote, FaClock, FaRainbow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../features/job/jobSlice';
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  salary,
  source,
  email,
  notes,
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo icon={<FaClock />} text={status} />
          {salary && <JobInfo icon={<FaRupeeSign />} text={salary} />}
          {email && <JobInfo icon={<FaMailBulk />} text={email} />}
          {notes && <JobInfo icon={<FaStickyNote />} text={notes} />}
        </div>
        <footer>
          <div className='actions'>
            {source && <button
              type="button"
              className="btn visit-btn"
              onClick={() => window.open(source)}
            >
              Visit
            </button>}
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    date,
                    jobLocation,
                    jobType,
                    status,
                    salary,
                    source,
                    email,
                    notes,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
