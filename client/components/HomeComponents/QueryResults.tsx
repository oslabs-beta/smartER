import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QueryResults: React.FC<{}> = () => {
  return (
    <>
      <div className="query-table">
        <div className="query-headers">
          <div className="header-name">title 1</div>
          <div>title 2</div>
          <div>title 3</div>
          <div>title 4</div>
        </div>
        <div className="query-rows"></div>
      </div>
    </>
  );
};

export default QueryResults;

// need to install
// npm i --save-dev @types/react-resizable
