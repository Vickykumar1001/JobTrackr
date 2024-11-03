import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Logo } from '../components';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      const { data } = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <div className="content">
          <Logo />
          <h2>Loading...</h2>
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <div className="content">
          <Logo />
          <h4>There was an error with verification. Please check your link or try again later.</h4>
          <Link to='/landing' className='btn'>
            Go to Homepage
          </Link>
        </div>

      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="content">
        <Logo />
        <h2>Account Verified!</h2>
        <p>You can now log in.</p>
        <Link to='/register' className='btn'>
          Go to Login
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);

  .content {
    background: white;
    padding: 3rem 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
    animation: fadeIn 0.5s ease-in-out;

    h2 {
      margin: 1rem 0;
      font-size: 1.75rem;
      font-weight: 700;
      color: #2d3748;
    }

    h4 {
      color: #e53e3e;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #4a5568;
      margin-bottom: 1.5rem;
    }

    .btn {
      background-color: #3182ce;
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 5px;
      font-size: 1rem;
      transition: background-color 0.3s, transform 0.3s;
      display: inline-block;
    }

    .btn:hover {
      background-color: #2b6cb0;
      transform: translateY(-2px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default VerifyEmail;
