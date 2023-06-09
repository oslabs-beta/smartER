import React, { useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';

interface setTab {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const History: React.FC<setTab> = ({ setTab }) => {
  const {
    history,
    setHistory,
    queryString,
    setQueryString,
    submit,
    setSubmit,
  } = useContext(HomepageContext)!;
  const [historyElements, setHistoryElements] = useState([]);

  const getHistory = async () => {
    try {
      const data = await fetch('api/getHistory', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const parsedHistory = await data.json();
      setHistory((prev: any) => {
        prev.push(...parsedHistory);
        return prev;
      });

      makeHistoryElements();
    } catch (error) {
      console.log('history error', error);
    }
  };

  const convertTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const makeHistoryElements = () => {
    const elements: any = history.map((object, index) => {
      const localTime = convertTime(object.created_at);
      return (
        <li key={`${index}-row`}>
          <ul className="history-rows">
            <li
              className="query-table-cell history-query"
              key={`${index}-historyQuery`}
              onClick={setHistoricalQuery}
            >
              {object.query}
            </li>
            <li
              className="query-table-cell history-time"
              key={`${index}-HistoryTime`}
            >
              {localTime}
            </li>
          </ul>
        </li>
      );
    });
    setHistoryElements(elements);
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    makeHistoryElements();
  }, [history]);

  const setHistoricalQuery = (e: any) => {
    setTab('Query');
    setQueryString(e.target.innerText);
    // TODO: this set submit is not triggering the Diagram useEffect to update
    setSubmit(!submit);
  };

  return (
    <div className="history-table-container">
      <div className="history-table">
        <ul className="query-table">
          {historyElements}
          <li key="header-list">
            <ul className="header-row">
              <li className="query-table-cell" key="header-query">
                Query
              </li>
              <li className="query-table-cell" key="header-date">
                Created At
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default History;
