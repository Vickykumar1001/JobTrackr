import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .message-container {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.message-title {
  color: #1890ff; /* blue color for title */
  font-size: 1.5em;
  margin-bottom: 8px;
}

.message-text {
  color: #595959; /* subtle gray for body text */
  font-size: 1em;
}

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`
export default Wrapper
