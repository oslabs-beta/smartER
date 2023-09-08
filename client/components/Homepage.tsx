import React, { FC, useState, useContext, useEffect } from 'react';
import Diagram from './HomeComponents/Diagram';
import Header from './HomeComponents/Header';
import InputContainer from './HomeComponents/InputContainer';
import QueryResults from './HomeComponents/QueryResults';
import Split from 'react-split';
import { useNavigate } from 'react-router-dom';

const TopComp = () => {
  const navigate = useNavigate();

  return (
    <Split className="flex" sizes={[30, 70]} minSize={[300, 300]}>
      <InputContainer />
      <Diagram />
    </Split>
  );
};

const Homepage: React.FC<{}> = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <Split
          className={'main-container-split'}
          direction="vertical"
          sizes={[70, 30]}
          minSize={[200, 100]}
          gutterSize={5}
        >
          <TopComp />
          <QueryResults />
        </Split>
      </div>
    </>
  );
};

export default Homepage;
