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

      const elements: any = history.map((object, index) => {
        const date = object.created_at;
        const formatDate = date.substring(0, 10);
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
              {formatDate}
            </td>
          </tr>
        );
      });
      setHistoryElements(elements.reverse());
    } catch (error) {
      console.log('history error', error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const setHistoricalQuery = (e: any) => {
    console.log('clicked historical event');
    setQueryString(e.target.innerText);
    setSubmit(!submit);
  };

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
