import React, { FC, useState, useContext, useEffect } from 'react';
import Diagram from './HomeComponents/Diagram';
import Header from './HomeComponents/Header';
import InputContainer from './HomeComponents/InputContainer';
import QueryResults from './HomeComponents/QueryResults';
import Split from 'react-split';
import { useNavigate } from 'react-router-dom';

const TopComp = () => {
  const navigate = useNavigate();

  // TODO: stop calling authenticate everytime something re-renders
  (async () => {
    try {
      const authenticate = await fetch('/user/authenticate', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (authenticate.status !== 200) navigate('/');
    } catch (error) {
      console.log(`Error in useEffect Homepage ${error}`);
      return `Error in useEffect Homepage ${error}`;
    }
  })();
  return (
    <div>
      <Split className="flex" sizes={[30, 70]} minSize={[270, 40]}>
        <InputContainer />
        <Diagram />
      </Split>
    </div>
  );
};

const Homepage: React.FC<{}> = () => {
  //TODO: FETCH to authenticate Token: 401 not authenticated | 200 Sucess | 400 server error

  return (
    <>
      <Header />
      <div className="main-container">
        <Split direction="vertical" minSize={[600, 200]} gutterSize={5}>
          <TopComp />
        </Split>
      </div>
      <QueryResults />
    </>
  );
};

export default Homepage;

{
  /* <Split
      className="flex2"
      direction="vertical"
      sizes={[30, 70]}
      style={{height: 'calc(100vh-4rem'}}
    >
      <Split className="flex" sizes={[20, 80]} minSize={[10, 40]}>
        <div>Query</div>
        <div>Diagram</div>
      </Split>
      <div>Results</div>
    </Split>

    */
}

//vertial split works, but horizontal split does not
/*
  return (
    <Split
      direction="vertical"
      sizes={[70, 30]}
      style={{height: 'calc(100vh-4rem'}}
    >
      <Split className="flex" sizes={[30, 70]} minSize={[10, 40]}>
        <InputContainer />
        <Diagram />
      </Split>
      <QueryResults />
    </Split>
  );

*/
