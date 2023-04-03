import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';
import { historyType } from '../../../Context';
import { parse, Statement, astVisitor } from 'pgsql-ast-parser';
import { create } from 'domain';

const QueryInput: React.FC<{}> = () => {
  const { queryString, setQueryString } = useContext(HomepageContext)!;
  const { history, setHistory } = useContext(HomepageContext)!;
  const { submit, setSubmit } = useContext(HomepageContext)!;
  const { queryResponse, setQueryResponse } = useContext(HomepageContext)!;

  // Handle submit of queryString
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //setSubmit to trigger useEffect for re-rendering Diagram.tsx
    setSubmit(!submit);
    // POST request to database with queryString
    try {
      const created_at = String(Date.now());
      const data = await fetch('/api/getQueryResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ created_at, queryString }),
      });
      if (data.status === 200) {
        const parsedData = await data.json();
        //setState query result for rendering QueryResults.tsx
        setQueryResponse(parsedData);
      }

      //Update History State, for re-rendering History.tsx
      setHistory(() => {
        // console.log('history: ', history);
        return [...history, { created_at: created_at, query: queryString }];
      });
    } catch (error) {
      console.log(`Error in QueryInput.tsx ${error}`);
      return `Error in QueryInput.tsx ${error}`;
    }

    // response from GET should be sent to the Query Result component
    // console.log('QUERY HANDLE SUBMIT ', queryString);
  };

  return (
    <div className="query-main">
      <div className="query-main-inner">
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
    </div>
  );
};

export default QueryInput;
