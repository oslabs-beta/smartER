import React, { FC, useState, useContext, useEffect } from 'react';
import { HomepageContext } from '../../../Context';
import { historyType } from '../../../Context';

const QueryInput: React.FC<{}> = () => {
  const { queryString, setQueryString } = useContext(HomepageContext)!;
  const { history, setHistory } = useContext(HomepageContext)!;
  const { submit, setSubmit } = useContext(HomepageContext)!;
  const { queryResponse, setQueryResponse } = useContext(HomepageContext)!;

  //TODO: Add logic for live rendering nodes n stuff

  // on submit GET query result
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // POST request to database with queryString

    // GET request to database with object from the Query

    try {
      const created_at = String(Date.now());
      const data = await fetch('/api/getQueryResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ created_at, queryString }),
      });
      const parsedData = await data.json();
      setQueryResponse(parsedData);
      const newHistory: historyType[] = [
        { created_at: created_at, query: queryString },
        ...history,
      ];
      setHistory(newHistory);

      /*
      [ {
        "_id": 1,
        "name": "Luke Skywalker",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "species_id": "1",
        "homeworld_id": "1",
        "height": 172
        },
      ]
    */
    } catch (error) {
      console.log(`Error in QueryInput.tsx ${error}`);
      return `Error in QueryInput.tsx ${error}`;
    }

    // response from GET should be sent to the Query Result component
    console.log('QUERY HANDLE SUBMIT ', queryString);
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
