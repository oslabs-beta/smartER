import React, {memo} from 'react';
import {Handle} from 'reactflow';

const column = {
  position: `relative`,
  padding: `8px 16px`,
  flexGrow: 1,
  textAlign: `center`,
};

const columnData = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
};

const Column = ({columnName, columnDataType, isPrimaryKey, linkTo}) => {
  // // console.log(linkTo);
  // //WHAT NEEDS TO HAPPEN IS WHEN LINKTO IS TRUE, A NEW EDGE NEEDS TO BE MADE
  // // THE NEW NODE NEEDS TO HAVE THE TABLENAME AND COLUMN NAME FOR THE SOURCE
  // // THE NEW NODE ALSO NEEDS THE TABLENAME AND THE COLUMN NAME FOR THE TARGET
  // return (
  //   <div style={column}>
  //     {isPrimaryKey && !linkTo && (
  //       <Handle type="target" position="left" id={columnName} />
  //     )}
  //     <div style={columnData}>
  //       <p className="name">{columnName}</p>
  //       <p className="data-type">{columnDataType}</p>
  //     </div>
  //     {linkTo && !isPrimaryKey && (
  //       <Handle type="source" position="right" id={columnName} />
  //     )}
  //   </div>
  // );
};

export default memo(Column);
