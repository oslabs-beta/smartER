import { createContext, useContext, Dispatch, SetStateAction } from 'react';

// Login context
export type LoginContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
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

//Homepage Context
export type HomepageContextType = {
  submit: boolean;
  setSubmit: Dispatch<SetStateAction<boolean>>;
  queryString: string;
  setQueryString: Dispatch<SetStateAction<string>>;
  history: historyType[];
  setHistory: Dispatch<SetStateAction<any>>;
  uri: string;
  setUri: Dispatch<SetStateAction<string>>;
  dbCredentials: dbCredentialsType;
  setDBCredentials: Dispatch<SetStateAction<dbCredentialsType>>;
  queryResponse: any;
  setQueryResponse: Dispatch<SetStateAction<any>>;
  masterData: any;
  setMasterData: Dispatch<SetStateAction<any>>;
  renderedData: any;
  setRenderedData: Dispatch<SetStateAction<any>>;
  renderedDataPositions: any;
  setRenderedDataPositions: Dispatch<SetStateAction<any>>;
  errorMessages: string[];
  setErrorMessages: Dispatch<SetStateAction<string[]>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
};

const defaultHomeState = {
  submit: false,
  setSubmit: () => {},
  queryString: '',
  setQueryString: () => {},
  history: [],
  setHistory: () => {},
  uri: '',
  setUri: () => {},
  dbCredentials: {
    host: '',
    port: 0,
    dbUsername: '',
    dbPassword: '',
    database: '',
  },
  setDBCredentials: () => {},
  queryResponse: [],
  setQueryResponse: () => {},
  masterData: {},
  setMasterData: () => {},
  renderedData: {},
  setRenderedData: () => {},
  renderedDataPositions: [],
  setRenderedDataPositions: () => [],
  errorMessages: [],
  setErrorMessages: () => [],
  reset: false,
  setReset: () => {},
};

export const HomepageContext = createContext<HomepageContextType | undefined>(
  defaultHomeState
);

//TYPES
export interface historyType {
  created_at: string;
  query: string;
}

export interface dbCredentialsType {
  host: string;
  port: number;
  dbUsername: string;
  dbPassword: string;
  database: string;
}
