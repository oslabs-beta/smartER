import React, {FC, useState, useContext, useEffect} from 'react';
import {
  HomepageContext,
  HomepageContextType,
  dbCredentialsType,
} from '../../../Context';

const Settings: React.FC<{}> = () => {
  const {uri, setUri, dbCredentials, setDBCredentials} =
    useContext(HomepageContext)!;

  const handleUriSubmit = (e: any): void => {
    e.preventDefault();
    //TODO: Add fetch to add URI to DB
    setUri('');
  };

  const handleCredentialSubmit = (e: any): void => {
    e.preventDefault();
    //TODO: Add fetch to add Credentials to DB

    setDBCredentials((prev) => {
      return {host: '', port: 0, dbUsername: '', dbPassword: '', database: ''};
    });
  };

  return (
    <div className="settings-main">
      <div className="uri-main">
        <h2 className="settings-title">DB URI</h2>
        <form>
          <label htmlFor="uri">
            <input
              id="uri"
              className="settings-input"
              type="text"
              required
              onChange={(e) => setUri(e.target.value)}
              value={uri}
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
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return {...prevState, host: e.target.value};
              })
            }
            value={dbCredentials.host}
          />
          <label htmlFor="port">Port</label>
          <input
            id="port"
            className="user-input"
            type="number"
            required
            onChange={(e) =>
              setDBCredentials((prevState: any) => {
                return {...prevState, port: e.target.value};
              })
            }
            value={dbCredentials.port}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="user-input"
            type="text"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return {...prevState, dbUsername: e.target.value};
              })
            }
            value={dbCredentials.dbUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="user-input"
            type="password"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return {...prevState, dbPassword: e.target.value};
              })
            }
            value={dbCredentials.dbPassword}
          />
          <label htmlFor="database">Database</label>
          <input
            id="database"
            className="user-input"
            type="text"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return {...prevState, database: e.target.value};
              })
            }
            value={dbCredentials.database}
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
