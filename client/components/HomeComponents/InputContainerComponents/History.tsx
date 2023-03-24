import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';

const History: React.FC<{}> = () => {
  const { history, setHistory } = useContext(HomepageContext)!;
  //TODO: Get history from database and display it in a list
  return (
    <div className="">
      <li></li>
    </div>
  );
};

export default History;
