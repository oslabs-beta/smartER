import React, { useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import { LoginContext, HomepageContext } from './Context';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [queryString, setQueryString] = useState('');
  const [history, setHistory] = useState([]);
  const [uri, setUri] = useState('');
  const [dbCredentials, setDBCredentials] = useState({
    host: '',
    port: 0,
    dbUsername: '',
    dbPassword: '',
    database: '',
  });
  const [queryResponse, setQueryResponse] = useState([]);
  const [masterData, setMasterData] = useState({});
  const [renderedData, setRenderedData] = useState({});
  const [renderedDataPositions, setRenderedDataPositions] = useState({});
  const [errorMessages, setErrorMessages] = useState(['']);
  const [reset, setReset] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      <HomepageContext.Provider
        value={{
          submit,
          setSubmit,
          queryString,
          setQueryString,
          history,
          setHistory,
          uri,
          setUri,
          dbCredentials,
          setDBCredentials,
          queryResponse,
          setQueryResponse,
          masterData,
          setMasterData,
          renderedData,
          setRenderedData,
          renderedDataPositions,
          setRenderedDataPositions,
          errorMessages,
          setErrorMessages,
          reset,
          setReset,
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/homepage"
            element={
              localStorage.userIn === 'true' ? (
                <Homepage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </HomepageContext.Provider>
    </LoginContext.Provider>
  );
};

export default App;
