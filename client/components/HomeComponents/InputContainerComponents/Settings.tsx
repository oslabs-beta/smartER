import React, {FC, useState, useContext, useEffect} from 'react';
import {HomepageContext} from '../../../Context';

const Settings: React.FC<{}> = () => {
  const {uri, setUri, dbCredentials, setDBCredentials} =
    useContext(HomepageContext);

  const handleUriSubmit = (e: any) => {
    e.preventDefault();
    //TODO: Add fetch to add URI to DB
  };

  const handleCredentialSubmit = (e: any) => {
    e.preventDefault();
    //TODO: Add fetch to add Credentials to DB
  };

  return (
    <div className="settings-main">
      <div className="uri-main">
        <h2 className="settings-title">DB URI</h2>
        <form>
          <label htmlFor="uri">
            <input
              id="uri"
              className="user-input"
              type="text"
              required
              onChange={(e) => setUri(e.target.value)}
            />
          </label>
          <button type="submit" className="submit" onClick={handleUriSubmit}>
            Submit
          </button>
        </form>
      </div>

      <div className="credentials-main">
        <h2 className="settings-title">Credentials</h2>
        <form>
          <label htmlFor="host">Host</label>
          <input
            id="Host"
            className="user-input"
            type="text"
            required
            onChange={(e) => setDBCredentials(e.target.value)}
          />
          <label htmlFor="port">Port</label>
          <input
            id="port"
            className="user-input"
            type="text"
            required
            onChange={(e) => setDBCredentials(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="user-input"
            type="text"
            required
            onChange={(e) => setDBCredentials(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="user-input"
            type="password"
            required
            onChange={(e) => setDBCredentials(e.target.value)}
          />
          <label htmlFor="database">Database</label>
          <input
            id="database"
            className="user-input"
            type="text"
            required
            onChange={(e) => setDBCredentials(e.target.value)}
          />
          <button
            type="submit"
            className="submit"
            onClick={handleCredentialSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
