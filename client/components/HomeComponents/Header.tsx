import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// clicking profile modal will openthe option to logout
const Header: React.FC<{}> = () => {
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    e.preventDefault();
    navigate('/');
    //TODO: Add a fetch request delete cookies
  };
  return (
    <div>
      <div className="logo"> smartER </div>
      <button className="logout-button" onClick={handleClick}>
        logout
      </button>
    </div>
  );
};
export default Header;
