import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Context';

const Login: React.FC<{}> = () => {
  const { email, setEmail, password, setPassword } = useContext(LoginContext)!;
  const [validCredentials, setValidCredentials] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const data = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // if the user is authenticated 200
      if (data.status === 200) {
        setEmail('');
        setPassword('');
        // JOYCE: unsure if i need to keep this both in state and in localStorage
        localStorage.setItem('userIn', 'true');

        navigate('/homepage');
      }
      // 401 incorrect pw , 400 middleware error
      else if (data.status === 401) {
        setPassword('');
        setValidCredentials(false);
      } else if (data.status === 400) {
        setEmail('');
        setPassword('');
        setValidCredentials(false);
      }
    } catch (error) {
      console.log(`Error in useEffect login ${error}`);
      return `Error in useEffect login ${error}`;
    }
  };

  //Sign-up Route
  const routeToSignUp = (e: any) => {
    e.preventDefault();
    navigate('/signup');
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

        <button type="submit" className="submit" onClick={handleSubmit}>
          Login
        </button>

        {!validCredentials && (
          <div className="small-text">Incorrect Password or Email</div>
        )}
      </form>
      <div className="login-footer">
        Don&apos;t have an Account?{' '}
        <button type="button" className="small-submit" onClick={routeToSignUp}>
          Sign up here!
        </button>
      </div>
    </div>
  );
};

export default Login;
