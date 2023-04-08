import React, { useContext } from 'react';
import { HomepageContext } from '../../../Context';
import { debounce } from 'lodash';

const QueryInput: React.FC<{}> = () => {
  const {
    queryString,
    setQueryString,
    history,
    setHistory,
    errorMessages,
    setErrorMessages,
    submit,
    setSubmit,
    queryResponse,
    setQueryResponse,
    reset,
    setReset,
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
      //Update History State, for re-rendering History.tsx
      // setHistory((prev: any) => {
      //   console.log('IN QUERY SUBMIT history: ', history);
      //   prev.push({ created_at, query: queryString });
      //   return prev;
      // });
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
      errorList();
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
        <button
          className="clear-button"
          onClick={() => {
            setQueryResponse([]);
            setQueryString('');
            setReset(!reset);
          }}
        >
          X
        </button>
        <button
          type="submit"
          className="submit-query-button"
          onClick={handleSubmit}
        >
          →
        </button>
      </div>
      {errorMessages[0] && <div className="error-message-container">{err}</div>}
    </div>
  );
};

export default QueryInput;
