import React, {FC, useState, useContext, useEffect} from 'react';
import {HomepageContext} from '../../../Context';

const QueryInput: React.FC<{}> = () => {
  const {queryString, setQueryString} = useContext(HomepageContext);

  //TODO: Add logic for live rendering nodes n stuff

  const handleSubmit = (e): any => {
    e.preventDefault;
    console.log('QUERY HANDLE SUBMIT ', queryString);
  };

  return (
    <div className="query-main">
      Build your Query:
      <textarea
        className="query-input"
        required
        onChange={(e) => setQueryString(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="submit query-submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default QueryInput;
