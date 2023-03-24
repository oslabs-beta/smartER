import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';
import { historyType } from '../../../Context';

const QueryInput: React.FC<{}> = () => {
  const { queryString, setQueryString } = useContext(HomepageContext)!;
  const { history, setHistory } = useContext(HomepageContext)!;
  const { submit, setSubmit } = useContext(HomepageContext)!;

  //TODO: Add logic for live rendering nodes n stuff

  // on submit query result and er diagram will render
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    try {
      // POST request to database with queryString

      // GET request to database with object from the Query
      const api = async () => {
        const data = await fetch('https://localhost:9001/api/getQueryResults', {
          method: 'GET',
        });
        const jsonData = await data.json();
      };
      api();
      // response from GET should be sent to the Query Result component
      console.log('QUERY HANDLE SUBMIT ', queryString);
    } catch (err) {
      console.log('error in get');
    }
  };

  return (
    <div className="query-main">
      <textarea
        className="query-input"
        required
        placeholder="type your query"
        onChange={(e) => setQueryString(e.target.value)}
        value={queryString}
      ></textarea>
      <button
        type="submit"
        className="submit-query-button"
        onClick={handleSubmit}
      >
        →
      </button>
    </div>
  );
};

export default QueryInput;
