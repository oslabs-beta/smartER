import React, {FC, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginContext} from '../Context';

const Signup: React.FC<{}> = () => {
  const {email, setEmail, password, setPassword} = useContext(LoginContext)!;
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
      setPassword('');
      setSecondPW('');
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
      <h1>smartER</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formLine">
          <label className="login-text" htmlFor="email">
            <input
              id="email"
              className="user-input"
              type="text"
              required
              autoComplete="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
        </div>
        <div className="formLine">
          <label className="login-text" htmlFor="password">
            <input
              className="user-input"
              type="password"
              required
              autoComplete="current-password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <div className="formLine">
          <label className="login-text" htmlFor="password">
            <input
              className="user-input"
              type="password"
              required
              autoComplete="current-password"
              placeholder="re-enter password"
              onChange={(e) => setSecondPW(e.target.value)}
              value={secondPw}
            />
          </label>
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          Sign up
        </button>
        {!doMatch && <div className="small-text">Passwords do not match.</div>}
      </form>
      <div className="login-footer">
        Already have an account?{' '}
        <button type="button" className="small-submit" onClick={routeToLogin}>
          Sign in here!
        </button>
      </div>
    </>
  );
};

export default Signup;
