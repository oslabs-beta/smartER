import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context';

// clicking profile modal will openthe option to logout
const Header: React.FC<{}> = () => {
  const { email, setEmail, password, setPassword } = useContext(LoginContext)!;
  const navigate = useNavigate();

  const handleClick = async (e: any) => {
    try {
      e.preventDefault();
      const data = await fetch('/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setEmail('');
      setPassword('');
      localStorage.setItem('userIn', 'false');
      navigate('/');
    } catch (error) {
      console.log(`Error in useEffect logoutHandleClick ${error}`);
      return `Error in useEffect logoutHandleClick ${error}`;
    }
    // reset state of email and password to blank string

    //TODO: Add a fetch request delete cookies
  };
  return (
    <div className="header">
      <div className="logo"></div>
      <button className="logout-button" onClick={handleClick}>
        logout
      </button>
    </div>
  );
};
export default Header;
