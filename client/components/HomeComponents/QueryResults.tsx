import React, { useContext } from 'react';
import { HomepageContext } from '../../Context';

const QueryResults: React.FC<{}> = () => {
  const { queryResponse, setQueryResponse } = useContext(HomepageContext)!;
  const { errorMessages, setErrorMessages } = useContext(HomepageContext)!;

  // if data response from backend is 200 then set queryResponse to the data
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

  if (!errorMessages[0])
    return (
      <>
        <div className="query-table-outer-container">
          <h2>Query Results</h2>
          <div className="query-table-container">
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
                {columnsValue.map((column, index) => {
                  const columnsArray: JSX.Element[] = [];
                  column.map((data, i) => {
                    return columnsArray.push(
                      <td className="query-table-cell" key={i}>
                        {data}
                      </td>
                    );
                  });
                  return (
                    <tr key={`tr${index}`} className="query-rows">
                      {columnsArray}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="query-table-outer-container">
          <h2>Query Results</h2>
          <div className="query-table-container">
            <table className="query-table">
              <thead>
                <tr className="query-header"></tr>
              </thead>
              <tbody>See query error above</tbody>
            </table>
          </div>
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
