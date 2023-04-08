import React, { useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';

interface setTab {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const History: React.FC<setTab> = ({ setTab }) => {
  const { history, setHistory, setQueryString, submit, setSubmit } =
    useContext(HomepageContext)!;
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
    const utc = new Date(`${dateString.replace('z', '+00:00')}`);
    const timezoneOffset = new Date().getTimezoneOffset();
    const localDate = new Date(utc.setHours(utc.getHours() + timezoneOffset));
    return localDate.toLocaleString();
  };

  const makeHistoryElements = () => {
    console.log('HISTORY', history);
    const elements: any = history.map((object, index) => {
      const localTime = convertTime(object.created_at);
      return (
        <li>
          <ul
            className="history-rows"
            key={`${index}-row`}
            onClick={setHistoricalQuery}
          >
            <li
              className="query-table-cell history-query"
              key={`${index}-historyQuery`}
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
    setSubmit(!submit);
  };

  return (
    <div className="history-table-container">
      <div className="history-table">
        <ul className="query-table">
          {historyElements}
          <li>
            <ul className="header-row">
              <li className="query-table-cell">Query</li>
              <li className="query-table-cell">Created At</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default History;
