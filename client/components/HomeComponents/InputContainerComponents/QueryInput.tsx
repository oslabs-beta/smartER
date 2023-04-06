import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';
import { historyType } from '../../../Context';
import { parse, Statement, astVisitor } from 'pgsql-ast-parser';
import { create } from 'domain';
import conditionalSchemaParser from '../DiagramLogic/ConditionalSchemaParser';
import { debounce } from 'lodash';

const QueryInput: React.FC<{}> = () => {
  const { queryString, setQueryString, masterData, setMasterData } =
    useContext(HomepageContext)!;
  const { history, setHistory } = useContext(HomepageContext)!;
  const { submit, setSubmit } = useContext(HomepageContext)!;
  const { queryResponse, setQueryResponse } = useContext(HomepageContext)!;
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
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
      } else {
        // if the query is not valid, errorMessage will be returned
        const errorMessage = conditionalSchemaParser(
          queryString,
          masterData
        ).errorArr;
        if (errorMessage.length > 0) {
          console.log(errorMessage);
          const ErrorMessage: any = errorMessage.map((err) => {
            return (
              <div className="error-message">
                <tr className="error-rows" key={`${err}-row`}>
                  <td className="error-table-cell" key={err}>
                    {`⚠ ${err}`}
                  </td>
                </tr>
              </div>
            );
          });
          setErrorMessages(ErrorMessage);
        }
      }
      //Update History State, for re-rendering History.tsx
      setHistory((prev: any) => {
        console.log('IN QUERY SUBMIT history: ', history);
        prev.push({ created_at, query: queryString });
        return prev;
      });
    } catch (error) {
      console.log(`Error in QueryInput.tsx ${error}`);
      return `Error in QueryInput.tsx ${error}`;
    }
  };

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
      setSubmit(!submit);
    }
  };

  const handlePause = debounce(() => {
    const lowerCaseQuery = queryString.toLowerCase();
    if (lowerCaseQuery.includes('select') && lowerCaseQuery.includes('from')) {
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
        <div className="error-message-container">{errorMessages}</div>
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
