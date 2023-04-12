import React, { useContext } from 'react';
import { HomepageContext } from '../../../Context';
import { debounce } from 'lodash';

const QueryInput: React.FC<{}> = () => {
  const {
    queryString,
    setQueryString,
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //setSubmit to trigger useEffect for re-rendering Diagram.tsx and getting query results
    setSubmit(!submit);
  };

  // let checkPause: boolean;
  const handleTyping = (e: any) => {
    setQueryString(e.target.value);
    const lastChar = e.target.value[e.target.value.length - 1];
    const keys = new Set([' ', ',', ';', 'Tab', 'Return']);
    const lowerCaseQuery = e.target.value.toLowerCase();
    if (
      keys.has(lastChar) &&
      lowerCaseQuery.includes('select') &&
      lowerCaseQuery.includes('from')
    ) {
      setSubmit(!submit);
      errorList();
      // do not check for pause if the last character entered was in the list of keys
      //   checkPause = false;
      // } else {
      //   checkPause = true;
    }
  };

  const handlePause = debounce(() => {
    // only run if handleTyping functionality did not just run
    // if (checkPause) {
    const lowerCaseQuery = queryString.toLowerCase();
    if (lowerCaseQuery.includes('select') && lowerCaseQuery.includes('from')) {
      setSubmit(!submit);
    }
    // }
  }, 500);

  // handling tab key
  const handleKeys = (e: any) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      e.target.value = `${e.target.value.substring(
        0,
        start
      )}\t${e.target.value.substring(end)}`;
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  };

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
          onKeyDown={handleKeys}
        ></textarea>
        <button
          className="clear-button"
          onClick={() => {
            setQueryResponse([]);
            setQueryString('');
            setReset(!reset);
          }}
        >
          clear
        </button>
        <button
          type="submit"
          className="submit-query-button"
          onClick={handleSubmit}
        >
          run
        </button>
      </div>
      {errorMessages[0] && <div className="error-message-container">{err}</div>}
    </div>
  );
};

export default QueryInput;
