import React, { useState } from 'react';
import QueryInput from './InputContainerComponents/QueryInput';
import History from './InputContainerComponents/History';
import Settings from './InputContainerComponents/Settings';

const InputContainer: React.FC<{}> = () => {
  const [tab, setTab] = useState('Query');

  return (
    <div className="input-container">
      <div className="tab-container">
        <button
          className={tab === 'Query' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => setTab('Query')}
        >
          Query
        </button>
        <button
          className={tab === 'History' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => setTab('History')}
        >
          History
        </button>
        <button
          className={tab === 'Settings' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => setTab('Settings')}
        >
          Settings
        </button>
      </div>

      <div className="tab-content">
        <div className={tab === 'Query' ? 'content active-content' : 'content'}>
          <QueryInput />
        </div>
        <div
          className={tab === 'History' ? 'content active-content' : 'content'}
        >
          <History setTab={setTab} />
        </div>
        <div
          className={tab === 'Settings' ? 'content active-content' : 'content'}
        >
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default InputContainer;
