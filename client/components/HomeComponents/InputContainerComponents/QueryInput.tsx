import React, {FC, useState, useContext, useEffect} from 'react';
import {HomepageContext} from '../../../Context';

const QueryInput: React.FC<{}> = () => {
  const {queryString, setQueryString} = useContext(HomepageContext)!;

  //TODO: Add logic for live rendering nodes n stuff

  const handleSubmit = (e: any): void => {
    e.preventDefault;
    console.log('QUERY HANDLE SUBMIT ', queryString);
  };

  return (
    <div className="query-main">
      <textarea
        className="query-input"
        required
        placeholder="type your query"
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
