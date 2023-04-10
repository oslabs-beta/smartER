import React, { useState } from 'react';
import QueryInput from './InputContainerComponents/QueryInput';
import Settings from './InputContainerComponents/Settings';

const InputContainer: React.FC<{}> = () => {
  const [tab, setTab] = useState('Settings');

  return (
    <div className="input-container">
      <div className="tab-container">
        <button
          className={tab === 'Settings' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => setTab('Settings')}
        >
          Settings
        </button>
        <button
          className={tab === 'Query' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => setTab('Query')}
        >
          Query
        </button>
      </div>

      <div className="tab-content">
        <div className={tab === 'Query' ? 'content active-content' : 'content'}>
          <QueryInput />
        </div>
        <div
          className={tab === 'Settings' ? 'content active-content' : 'content'}
        >
          <Settings setTab={setTab} />
        </div>
      </div>
    </div>
  );
};

export default InputContainer;
