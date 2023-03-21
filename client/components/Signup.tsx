import React, {FC, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginContext} from '../Context';

const Signup: React.FC<{}> = () => {
  const {email, setEmail, password, setPassword} = useContext(LoginContext);
  const [secondPw, setSecondPW] = useState('');
  const [doMatch, setMatch] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (secondPw === password) {
      console.log('EMAIL IN SIGNUP', email);
      //TODO: Add fetch request to validate signup.
      setEmail('');
      setPassword('');
      setSecondPW('');
      setMatch(true);
    } else {
      setMatch(false);
      console.log('PASSWORDS DO NOT MATCH');
    }
  };

  // login route
  const routeToLogin = (e: any) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formLine">
          <label className="login-text" htmlFor="email">
            Email
            <input
              id="email"
              className="user-input"
              type="text"
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
        </div>
        <div className="formLine">
          <label className="login-text" htmlFor="password">
            Password
            <input
              className="user-input"
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <div className="formLine">
          <label className="login-text" htmlFor="password">
            Password
            <input
              className="user-input"
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setSecondPW(e.target.value)}
              value={secondPw}
            />
          </label>
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          Sign up
        </button>
        {!doMatch && <div>Passwords do not match.</div>}
      </form>
      <div className="login-footer">
        Already have an account?{' '}
        <button type="button" onClick={routeToLogin}>
          Sign in here!
        </button>
      </div>
    </>
  );
};

export default Signup;
