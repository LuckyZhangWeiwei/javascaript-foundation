import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextWithMemo from "./redux/ContextWithMemo"
import reportWebVitals from './reportWebVitals';
import Parent from './react-parent-child-render-test';
import ReactRouteApp from './react-router-test/demo/App';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ContextWithMemo /> */}
    {/* <Parent /> */}
    <ReactRouteApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
