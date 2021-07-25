import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import ContextWithMemo from "./redux/ContextWithMemo"
import reportWebVitals from "./reportWebVitals";
// import Parent from './react-parent-child-render-test';
// import ReactRouteApp from './react-router-test/demo/App';

// import { Provider } from "./react-redux-learning/my-react-redux";
// import store from "./react-redux-learning/store";
// import App from "./react-redux-learning/App";
// import TestContext from "./react-redux-learning/TestContext";
// import Counter from "./react-setState";

import ClosureTrap from "./react-closuretrap/closuretrap";

// const setting = {
//   color: "#d89151",
// };

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ContextWithMemo /> */}
    {/* <Parent /> */}
    {/* <ReactRouteApp /> */}
    {/* <Provider store={store}>
      <TestContext.Provider value={setting}>
        <App />
      </TestContext.Provider>
    </Provider> */}
    {/* <Counter /> */}
    <ClosureTrap />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
