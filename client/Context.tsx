import React, { createContext, useContext } from 'react';

type LoginContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const defaultState = {
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
};

export const LoginContext = createContext<LoginContextType | undefined>(
  defaultState
);

//TODO: add a Homepage Context
