import React from 'react';
import { useNavigate } from 'react-router-dom';

// clicking profile modal will openthe option to logout
const Header: React.FC<{}> = () => {
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <div className="header">
      <div className="logo"> smartER </div>
      <button className="logout-button" onClick={handleClick}>
        back
      </button>
    </div>
  );
};
export default Header;
