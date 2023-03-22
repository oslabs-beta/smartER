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
      Enter your Query:
      <form>
        <textarea
          className="query-input"
          required
          onChange={(e) => setQueryString(e.target.value)}
        ></textarea>
      </form>
      <button type="submit" className="query-submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default QueryInput;
