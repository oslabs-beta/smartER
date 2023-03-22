import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginContext, HomepageContext } from './Context';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Signup from './components/Signup';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [home, setHome] = useState('');
  const [queryString, setQueryString] = useState('');
  const [history, setHistory] = useState([
    { created_at: 'hello', query: 'world' },
  ]);
  const [uri, setUri] = useState('');
  const [dbCredentials, setDbCredentials] = useState({
    host: '',
    port: 3000,
    dbUsername: '',
    dbPassword: '',
    database: '',
  });

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
          home,
          setHome,
          queryString,
          setQueryString,
          history,
          setHistory,
          uri,
          setUri,
          dbCredentials,
          setDbCredentials,
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

// nest providers?
export default App;
