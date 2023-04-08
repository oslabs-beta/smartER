import React, { FC, useState, useContext, useEffect } from 'react';
import {
  HomepageContext,
  HomepageContextType,
  dbCredentialsType,
} from '../../../Context';
import { parse } from 'path';

const Settings: React.FC<{}> = () => {
  const {
    uri,
    setUri,
    dbCredentials,
    setDBCredentials,
    masterData,
    setMasterData,
  } = useContext(HomepageContext)!;
  //Handle submission of new URI
  const handleUriSubmit = async (e: any) => {
    e.preventDefault();
    //TODO: Add fetch to add URI to DB, email will be parsed from JWT on backend
    try {
      const encodedURI: string = encodeURIComponent(uri);
      const data = await fetch('/api/addURI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encodedURI }),
      });
      if (data.status === 200) {
        //TODO: add a success indicator
        setUri('');
        const parsedData = await data.json();
        setMasterData(parsedData);
        return;
      }
    } catch (error) {
      console.log(`Error in Settings.tsx ${error}`);
      return `Error in Settings.tsx ${error}`;
    }
  };

  //Handle submission of new Credentials
  const handleCredentialSubmit = async (e: any) => {
    e.preventDefault();
    //TODO: Add fetch to add Credentials to DB
    const { host, port, dbUsername, dbPassword, database } = dbCredentials;
    const hostspec = port ? `${host}:${port}` : host;
    const encodedURI: string = encodeURIComponent(
      `postgres://${dbUsername}:${dbPassword}@${hostspec}/${database}`
    );
    try {
      const data = await fetch('/api/addURI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encodedURI }),
      });
    } catch (error) {}
    setDBCredentials({
      host: '',
      port: 0,
      dbUsername: '',
      dbPassword: '',
      database: '',
    });
  };

  return (
    <div className="settings-main">
      <div className="uri-main">
        <h2 className="settings-title">URI</h2>
        <form>
          <label htmlFor="uri">
            <input
              id="uri"
              className="db-settings-input"
              type="password"
              required
              onChange={(e) => setUri(e.target.value)}
              value={uri}
            />
            <button
              type="submit"
              className="db-submit-settings"
              onClick={handleUriSubmit}
            >
              connect
            </button>
          </label>
        </form>
      </div>

      <div className="credentials-main">
        <h2 className="settings-title">Credentials</h2>
        <form>
          <label htmlFor="host">Host</label>
          <input
            id="Host"
            className="settings-input"
            type="text"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return { ...prevState, host: e.target.value };
              })
            }
            value={dbCredentials.host}
          />
          <label htmlFor="port">Port</label>
          <input
            id="port"
            className="settings-input"
            type="number"
            required
            onChange={(e) =>
              setDBCredentials((prevState: any) => {
                return { ...prevState, port: e.target.value };
              })
            }
            value={dbCredentials.port}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="settings-input"
            type="text"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return { ...prevState, dbUsername: e.target.value };
              })
            }
            value={dbCredentials.dbUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="settings-input"
            type="password"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return { ...prevState, dbPassword: e.target.value };
              })
            }
            value={dbCredentials.dbPassword}
          />
          <label htmlFor="database">Database</label>
          <input
            id="database"
            className="settings-input"
            type="text"
            required
            onChange={(e) =>
              setDBCredentials((prevState: dbCredentialsType) => {
                return { ...prevState, database: e.target.value };
              })
            }
            value={dbCredentials.database}
          />
          <button
            type="submit"
            className="submit-settings"
            onClick={handleCredentialSubmit}
          >
            connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
