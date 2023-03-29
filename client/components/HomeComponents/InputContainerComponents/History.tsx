import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';

const History: React.FC<{}> = () => {
  const { history, setHistory } = useContext(HomepageContext)!;
  //TODO: Get history from database and display it in a list
  // on rendering of the element
  // fetch request to see the history
  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetch('api/getHistory', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('data for history: ', data);
      } catch (error) {}
    };
  });
  // traverse the data received and put it into the list

  return (
    <div className="">
      <li></li>
    </div>
  );
};

export default History;
