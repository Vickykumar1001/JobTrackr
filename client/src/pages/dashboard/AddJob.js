import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    status,
    statusOptions,
    jobType,
    jobTypeOptions,
    salary,
    source,
    email,
    notes,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status, salary, source, email, notes, },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status, salary, source, email, notes, }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user.location,
        })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            placeholder="Enter company name"
            handleChange={handleJobInput}
          />
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            placeholder="Enter position title"
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            placeholder='Enter job location'
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type*/}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* salary range */}
          <FormRow
            type='text'
            name='salary'
            labelText='salary range'
            placeholder='eg. 7LPA - 10LPA'
            value={salary}
            handleChange={handleJobInput}
          />
          {/* application source */}
          <FormRow
            type='text'
            name='source'
            value={source}
            labelText='Job Application Link'
            placeholder="Paste your application link here"
            handleChange={handleJobInput}
          />
          {/* email */}
          <FormRow
            type='text'
            name='email'
            value={email}
            labelText='Email Address'
            placeholder="If Emailed any HR"
            handleChange={handleJobInput}
          />
          {/* notes */}
          <FormRow
            type='text'
            name='notes'
            labelText='Notes'
            value={notes}
            placeholder="Enter additional information (optional)"
            handleChange={handleJobInput}
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
