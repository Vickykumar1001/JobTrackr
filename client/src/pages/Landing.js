import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            Welcome to <span>JobTrackr</span>
          </h1>
          <p>
            Stay organized in your job search with JobTrackr – your personal job application manager.
            Track applications, set reminders, and make the job hunt easier. Get started today and stay on
            top of every opportunity!
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='Job Tracking Dashboard' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
