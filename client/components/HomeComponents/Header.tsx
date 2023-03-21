import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{}> = () => {
  const [showLogout, setShowLogout] = useState(false);
  const profileClick = () => {
    if (showLogout) setShowLogout(false);
    else {
      setShowLogout(true);
    }
  };
  // clicking profile modal will openthe option to logout
  const ProfileModal: React.FC<{}> = () => {
    const navigate = useNavigate();
    const handleClick = (e: any) => {
      e.preventDefault();
      navigate('/');
      //TODO: Add a fetch request delete cookies
    };
    return (
      <div>
        <button className="logout-button" onClick={handleClick}>
          Logout
        </button>
      </div>
    );
  };
  return (
    <div>
      <div className="logo"> smartER </div>
      <button className="logout-home" onClick={profileClick}></button>
      <div className="logout-button">{showLogout && <ProfileModal />}</div>
    </div>
  );
};
export default Header;
