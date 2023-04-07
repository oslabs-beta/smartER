import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';
import { historyType } from '../../../Context';
import { parse, Statement, astVisitor } from 'pgsql-ast-parser';
import { create } from 'domain';
import conditionalSchemaParser from '../DiagramLogic/ConditionalSchemaParser';
import { debounce } from 'lodash';

const QueryInput: React.FC<{}> = () => {
  const {
    queryString,
    setQueryString,
    masterData,
    setMasterData,
    history,
    setHistory,
    errorMessages,
    setErrorMessages,
    submit,
    setSubmit,
    queryResponse,
    setQueryResponse,
  } = useContext(HomepageContext)!;

  const errorList = () => {
    // if the query is not valid, errorMessage will be returned
    if (errorMessages.length > 0) {
      const ErrorMessage: any = errorMessages.map((err, i) => {
        return (
          <div
            className="error-table-cell error-message"
            key={`${i}-errorCell`}
          >
            {`⚠ ${err}`}
          </div>
        );
      });
      return ErrorMessage;
    }
  };

  const err = errorList();
  // Handle submit of queryString
  const handleSubmit = async (e: any) => {
    // setErrorMessages([]);
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
      } else {
        // errorList();
      }
      // Update History State, for re-rendering History.tsx
      const numberTime = Number(created_at);
      function getZDateString(timestamp: number) {
        const date = new Date(timestamp);
        const zDateString = date.toISOString();
        return zDateString;
      }
      const zDateString = getZDateString(numberTime);

      setHistory((prev: any) => {
        prev.push({ created_at: zDateString, query: queryString });
        return prev;
      });
    } catch (error) {
      console.log(`Error in QueryInput.tsx ${error}`);
      return `Error in QueryInput.tsx ${error}`;
    }
  };

  // TODO: HANDLE LIVE QUERY without saving to history?
  // const liveQuery = async () => {
  //   try {
  //     const created_at = String(Date.now());
  //     const data = await fetch('/api/getLiveQueryResults', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ created_at, queryString }),
  //     });
  //     if (data.status === 200) {
  //       const parsedData = await data.json();
  //       //setState query result for rendering QueryResults.tsx
  //       setQueryResponse(parsedData);
  //     } else {
  //       // errorList();
  //     }
  //   } catch (error) {
  //     console.log(`Error in QueryInput.tsx ${error}`);
  //     return `Error in QueryInput.tsx ${error}`;
  //   }
  // };

  const handleTyping = (e: any) => {
    setQueryString(e.target.value);
    const lastChar = e.target.value[e.target.value.length - 1];
    const keys = new Set([' ', ',', ';']);
    const lowerCaseQuery = e.target.value.toLowerCase();
    if (
      keys.has(lastChar) &&
      lowerCaseQuery.includes('select') &&
      lowerCaseQuery.includes('from')
    ) {
      // liveQuery();
      setSubmit(!submit);
      errorList();
    }
  };

  const handlePause = debounce(() => {
    const lowerCaseQuery = queryString.toLowerCase();
    if (lowerCaseQuery.includes('select') && lowerCaseQuery.includes('from')) {
      // liveQuery();
      setSubmit(!submit);
    }
  }, 1000);

  return (
    <div className="query-main">
      <div className="query-main-inner">
        <textarea
          className="query-input"
          required
          placeholder="type your query"
          onChange={handleTyping}
          value={queryString}
          onKeyUp={handlePause}
        ></textarea>
        {errorMessages[0] && (
          <div className="error-message-container">{err}</div>
        )}
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
