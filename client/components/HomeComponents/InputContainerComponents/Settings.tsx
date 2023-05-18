import React, { useContext } from 'react';
import { HomepageContext, dbCredentialsType } from '../../../Context';

interface setTab {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<setTab> = ({ setTab }) => {
  const {
    uri,
    setUri,
    savedUri,
    setSavedUri,
    dbCredentials,
    setDBCredentials,
    errorMessages,
    queryString,
    setQueryString,
    setErrorMessages,
    masterData,
    setMasterData,
    connectionStatus,
    setConnectionStatus,
  } = useContext(HomepageContext)!;

  //Handle submission of new URI
  const handleUriSubmit = async (e: any) => {
    e.preventDefault();
    //TODO: Add fetch to add URI to DB, email will be parsed from JWT on backend
    try {
      const encodedURI: string = encodeURIComponent(uri);
      const data = await fetch('/api/getSchema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uri: encodedURI }),
      });
      if (data.status === 200) {
        //TODO: add a success indicator
        setSavedUri(encodedURI);
        setUri('');
        setTab('Query');
        setErrorMessages(['']);
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let encodedURI: string;
    if (uri) {
      encodedURI = encodeURIComponent(uri);
    } else {
      const { host, port, dbUsername, dbPassword, database } = dbCredentials;
      const hostspec = port ? `${host}:${port}` : host;
      encodedURI = encodeURIComponent(
        `postgres://${dbUsername}:${dbPassword}@${hostspec}/${database}`
      );
    }
    try {
      const data = await fetch('/api/getSchema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uri: encodedURI }),
      });

      if (data.status === 200) {
        //TODO: add a success indicator
        setSavedUri(encodedURI);
        setTab('Query');
        const parsedData = await data.json();
        setMasterData(parsedData);
        setConnectionStatus('success');
      } else {
        //display error banner
        setConnectionStatus('failed');
      }
      //clear inputs
      setUri('');
      setErrorMessages(['']);
      setQueryString('');
      setDBCredentials({
        host: '',
        port: 0,
        dbUsername: '',
        dbPassword: '',
        database: '',
      });
    } catch (error) {
      console.log('Error in Settings.tsx handleSubmit');
    }
  };

  return (
    <div className="settings-main">
      <div className="uri-main">
        <h2 className="settings-title">URI</h2>
        <form>
          <label htmlFor="uri">
            <input
              id="uri"
              className="settings-input"
              type="password"
              required
              onChange={(e) => setUri(e.target.value)}
              value={uri}
            />
          </label>

          <h2 className="settings-title">Credentials</h2>
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
            onClick={handleSubmit}
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
