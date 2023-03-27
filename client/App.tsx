import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginContext, HomepageContext } from './Context';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [queryString, setQueryString] = useState('');
  const [history, setHistory] = useState([
    { created_at: 'hello', query: 'world' },
  ]);
  const [uri, setUri] = useState('');
  const [dbCredentials, setDBCredentials] = useState({
    host: '',
    port: 0,
    dbUsername: '',
    dbPassword: '',
    database: '',
  });
  const [queryResponse, setQueryResponse] = useState([]);

  const navigate = useNavigate();

  // (async () => {
  //   try {
  //     const authenticate = await fetch('/user/authenticate', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     if (authenticate.status !== 200) navigate('/');
  //   } catch (error) {
  //     console.log(`Error in useEffect Homepage ${error}`);
  //     return `Error in useEffect Homepage ${error}`;
  //   }
  // })();
  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        loggedIn,
        setLoggedIn,
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
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />;
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </HomepageContext.Provider>
    </LoginContext.Provider>
  );
};

export default App;
