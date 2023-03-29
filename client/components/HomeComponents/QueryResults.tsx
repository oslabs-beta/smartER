import React, { FC, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import DataTable, { Direction } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { HomepageContext } from '../../Context';

const QueryResults: React.FC<{}> = () => {
  const { queryResponse, setQueryResponse } = useContext(HomepageContext)!;
  const { history, setHistory } = useContext(HomepageContext)!;

  /* columnNames: [['id','name',...] */
  let columnNames: string[] = [];

  // table headers
  for (const row of queryResponse) {
    columnNames = Object.keys(row);
  }

  // table rows
  const columnsValue: string | number[][] = [];
  let columnsValuesInner: any = [];
  // get an array of just the values from each object in the queryResponse array
  for (let i = 0; i < queryResponse.length; i++) {
    const resultsArr = Object.entries(queryResponse[i]);
    for (const result of resultsArr) {
      columnsValuesInner.push(result[1]);
    }
    columnsValue.push(columnsValuesInner);
    columnsValuesInner = [];
  }
  // select * from planets where _id < 5
  // console.log('line 29: ', columnsValue);

  // columns should be an object with the value being an array
  console.log(columnsValue);
  return (
    <>
      <div className="query-table-home">
        <h2>Query Results</h2>
        <table className="query-table">
          <thead>
            <tr className="query-header">
              {columnNames.map((column) => {
                return (
                  <th className="query-table-cell" key={column}>
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {columnsValue.map((column) => {
              console.log(column);
              let i = 0;
              const columnsArray: JSX.Element[] = [];
              column.map((data) => {
                i++;
                return columnsArray.push(
                  <td className="query-table-cell" key={i}>
                    {data}
                  </td>
                );
              });
              return <tr className="query-rows">{columnsArray}</tr>;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QueryResults;

// {
//   columnsValue.map((values: any) => {
//     <tr>
//       {columnNames.map((column: any) => {
//         return <td key={column}>{values[column]}</td>;
//       })}
//     </tr>;
//   });
// }

// {columnsValue.map((value) => {
//             <tr key={value}>
//               {columnNames.map((column) => (
//                 (<td key={column} className="query-table-cell">
//                   {value[column]}
//                 </td>
//               ))}
//             </tr>
//           })}
