import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';

const History: React.FC<{}> = () => {
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

  const makeHistoryElements = () => {
    const elements: any = history.map((object, index) => {
      const localTime = convertToPST(object.created_at);
      return (
        <tr
          className="history-rows"
          key={`${index}-row`}
          onClick={setHistoricalQuery}
        >
          <td className="query-table-cell history-query" key={index}>
            {object.query}
          </td>
          <td className="query-table-cell history-time" key={`${index}-time`}>
            {localTime}
          </td>
        </tr>
      );
    });
    setHistoryElements(elements.reverse());
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    makeHistoryElements();
  }, [history]);

  const setHistoricalQuery = (e: any) => {
    setQueryString(e.target.innerText);
    setSubmit(!submit);
  };

  function convertToPST(dateString: string): string {
    const date = new Date(dateString);
    const utcOffset = date.getTimezoneOffset();
    const utcOffsetMs = utcOffset * 60 * 1000;
    const pstDate = new Date(date.getTime() - utcOffsetMs - 7 * 60 * 60 * 1000);
    const pstDateString = pstDate
      .toISOString()
      .replace('T', ' ')
      .replace('.000Z', '');
    return pstDateString.substring(0, 10);
  }

  return (
    <div className="history-table">
      <table className="query-table">
        <thead>
          <tr>
            <th className="query-table-cell">Query</th>
            <th className="query-table-cell">Created At</th>
          </tr>
        </thead>
        <tbody>{historyElements}</tbody>
      </table>
    </div>
  );
};

export default History;
