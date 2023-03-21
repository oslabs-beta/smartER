import React, {FC, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';

const Signup: React.FC<{}> = () => {
  const {email, setEmail, password, setPassword} = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: Add fetch request to validate login.
    console.log('EMAIL IN SIGNUP', email);
    setEmail('');
    setPassword('');
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
            />
          </label>
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          Sign up
        </button>
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
