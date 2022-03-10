import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './fonts/fonts.scss';
import './ui-kit/index.sass';
import './index.sass';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
