import {createRoot} from 'react-dom/client';
import React from 'react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
// import styles from './styles/login.scss';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
