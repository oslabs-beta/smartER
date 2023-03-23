import React, {memo, useEffect, useState} from 'react';

import Column from './Column';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  border: '0px solid #bbb',
  fontSize: '10pt',
  position: 'relative',
  minWidth: 150,
};

const tableHeading = {
  padding: `8px 32px`,
  flexGrow: 1,
  backgroundColor: '#eee',
  textAlign: `center`,
};

const TableNode = ({data}) => {
  const [columns, setColumns] = useState([]);
  const {tableData} = data;

  useEffect(() => {
    tableData.columns.forEach((column, i) => {
      const [[columnName, other]] = Object.entries(column);
      const columnDataType = other.type || other;
      const isPrimaryKey = other.primaryKey || false;
      const linkTo = other.linkedTable || null;
      setColumns((prev) => [
        ...prev,
        <Column
          key={`C${i}`}
          columnName={columnName}
          columnDetails={other}
          columnDataType={columnDataType}
          isPrimaryKey={isPrimaryKey}
          linkTo={linkTo}
        />,
      ]);
      if (linkTo) {
        const sourceTable = tableData.tableName;
        const sourceColumn = columnName;
        const [targetTable, targetColumn] = linkTo.split(`.`);

        data.updateEdge({
          id: `${sourceTable}/${sourceColumn}-${targetTable}/${targetColumn}`,
          source: sourceTable,
          target: targetTable,
          sourceHandle: sourceColumn,
          targetHandle: targetColumn,
        });
      }
    });
  }, []);

  return (
    <div className="table-node" style={containerStyle}>
      <div className="table-node__container">
        <div style={tableHeading}>{tableData.tableName}</div>
        <div className="table-node__columns-container">{columns}</div>
      </div>
    </div>
  );
};

export default memo(TableNode);
