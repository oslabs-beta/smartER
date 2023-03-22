import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Resizable } from 'react-resizable';

const QueryResults: React.FC<{}> = () => {
  const [state, setState] = useState({ width: 300, height: 100 });
  return (
    <>
      <Resizable
        style={{ marginLeft: 500, marginTop: 200, border: '1px solid black' }}
        size={{ width: state.width, height: state.height }}
        onResize={(e: any, direction: any, ref: any, d: any) => {
          setState({
            width: state.width + d.width,
            height: state.height + d.height,
          });
        }}
      ></Resizable>
      <div className="result-box">THIS IS A BOX</div>
    </>
  );
};

export default QueryResults;

// need to install
// npm i --save-dev @types/react-resizable
