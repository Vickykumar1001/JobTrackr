import StatItem from './StatItem';
import { FaBriefcase, FaClipboardCheck, FaCalendarAlt, FaUserCheck, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: 'Total Applications',
      count: stats.totalApplications || 0,
      icon: <FaBriefcase />,
      color: '#2c3e50',
      bcg: '#ecf0f1',
    },
    {
      title: 'Pending Applications',
      count: stats.pending || 0,
      icon: <FaClipboardCheck />,
      color: '#f1c40f',
      bcg: '#f9e79f',
    },
    {
      title: 'Interviews Scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarAlt />,
      color: '#2980b9',
      bcg: '#d0e9f9',
    },
    {
      title: 'Round 1 & 2',
      count: stats.round || 0,
      icon: <FaUserCheck />,
      color: '#e67e22',
      bcg: '#f9c6a6',
    },
    {
      title: 'Jobs Offered',
      count: stats.offered || 0,
      icon: <FaCheckCircle />,
      color: '#27ae60',
      bcg: '#d5f5e3',
    },
    {
      title: 'Jobs Declined',
      count: stats.declined || 0,
      icon: <FaTimesCircle />,
      color: '#c0392b',
      bcg: '#f8d7da',
    },
  ];


  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
