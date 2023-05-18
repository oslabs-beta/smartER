import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomepageContext } from '../../Context';
// clicking profile modal will openthe option to logout
const Header: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { connectionStatus, setConnectionStatus } =
    useContext(HomepageContext)!;

  const handleClick = (e: any) => {
    e.preventDefault();
    navigate('/');
  };

  //useeffect to set a timeout on how long the banner shows
  useEffect(() => {
    setTimeout(() => {
      setConnectionStatus('');
    }, 3000);
  }, [connectionStatus]);

  return (
    <div className="header">
      <div className="logo"></div>
      <div
        className={
          connectionStatus === 'failed'
            ? 'content connection failed'
            : 'content'
        }
      >
        Connection failed. Please try again.
      </div>
      <div
        className={
          connectionStatus === 'success'
            ? 'content connection success'
            : 'content'
        }
      >
        Connection success!
      </div>
      <button className="logout-button" onClick={handleClick}>
        Back
      </button>
    </div>
  );
};
export default Header;
