import React, {useState, useMemo} from 'react';
import {Route, Routes} from 'react-router-dom';
import {LoginContext} from './Context';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </LoginContext.Provider>
  );
};

// nest providers?
export default App;
