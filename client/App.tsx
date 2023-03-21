import React, {useState, useMemo} from 'react';
import {GlobalContext} from './GlobalContext';
import Login from './components/Login';

export const App = () => {
  return (
    <GlobalContext.Provider
      value={{
        email: 'hello@world.com',
        setEmail: () => console.log('email was set'),
      }}
    >
      <h1>Auto Sql</h1>
      <Login />
    </GlobalContext.Provider>
  );
};

// const contextValue = useMemo(
//   () => ({
//     email,
//     setEmail,
//   }),
//   [email, setEmail]
// );
