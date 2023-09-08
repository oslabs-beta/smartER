import React, { FC, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Context';

const Signup: React.FC<{}> = () => {
  const { email, setEmail, password, setPassword } = useContext(LoginContext)!;
  const [secondPw, setSecondPW] = useState('');
  const [doPwMatch, setPwMatch] = useState(true);

  // TODO: Set up an email already exists function
  const [emailExistsError, setEmailExistsError] = useState(false);

  const navigate = useNavigate();

  //EMAIL CHECK
  useEffect(() => {
    (async () => {
      try {
        //if email has a '@' and '.'
        const validEmail = new RegExp(/^\S+@\S+\.\S\S+$/);

        if (email.match(validEmail)) {
          //Make API req to backend since match has been found to be valid email
          setEmailExistsError(false);
          const data = await fetch('/user/emailCheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const parsedData = await data.json();
          if (parsedData === 'user exists') {
            setEmailExistsError(true);
          }
        }
      } catch (error) {
        console.log(`Error in useEffect signup.tsx ${error}`);
        return `Error in useEffect signup.tsx ${error}`;
      }
    })();
  }, [email]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      if (secondPw === password) {
        const data = await fetch('/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (data.status === 200) {
          localStorage.setItem('userIn', 'true');
          navigate('/homepage');
        }
        // 400 General Error | 409 User already exists | 200 Success
        else if (data.status === 404 || data.status === 400) {
          setEmail('');
          setPassword('');
          setSecondPW('');
          setPwMatch(true);
        } else if (data.status === 409) {
          setEmail('');
          setPassword('');
          navigate('/');
        }
      } else {
        setPassword('');
        setSecondPW('');
        setPwMatch(false);
      }
    } catch (error) {
      console.log(`Error in signup.tsx handleSubmit ${error}`);
      return `Error in signup.tsx handleSubmit ${error}`;
    }
  };

  // login route
  const routeToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <div className="logo"></div>
      </div>
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
        {emailExistsError && (
          <div className="small-text">Email already in use.</div>
        )}
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
        {!doPwMatch && (
          <div className="small-text">Passwords do not match.</div>
        )}
      </form>
      <div className="login-footer">
        Already have an account?{' '}
        <button type="button" className="small-submit" onClick={routeToLogin}>
          Sign in here!
        </button>
      </div>
    </div>
  );
};

export default Signup;
