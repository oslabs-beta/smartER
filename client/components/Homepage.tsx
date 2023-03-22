import React, {FC, useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Diagram from './HomeComponents/Diagram';
import Header from './HomeComponents/Header';
import InputContainer from './HomeComponents/InputContainer';
import QueryResults from './HomeComponents/QueryResults';
import {HomepageContext} from '../Context';

const Homepage: React.FC<{}> = () => {
  const {home, setHome} = useContext(HomepageContext)!;
  const {queryString, setQueryString} = useContext(HomepageContext)!;
  const {history, setHistory} = useContext(HomepageContext)!;
  const {dbCredentials, setDBCredentials} = useContext(HomepageContext)!;

  // useEffect(() => {
  //   setHome('HELLO WORLD');
  //   setQueryString('setting query string');
  //   console.log('history: ', history);
  //   console.log('dbCredentials: ', dbCredentials);
  //   setHistory([{created_at: 'hello', query: 'word'}]);
  //   console.log('history: ', history);
  // }, []);

  return (
    <div>
      {home}
      <div>{queryString}</div>
      <InputContainer />
    </div>
  );
};

export default Homepage;
