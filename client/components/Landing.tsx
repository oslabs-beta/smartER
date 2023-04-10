import React, { useContext } from 'react';
import { HomepageContext, dbCredentialsType } from '../Context';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC<{}> = () => {
  const { savedUri, setSavedUri } = useContext(HomepageContext)!;
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    navigate('/homepage');
  };

  return (
    <>
      <h1>smartER</h1>
      <button className="main" onClick={handleClick}>
        main
      </button>
    </>
  );
};

export default Landing;
