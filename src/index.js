import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import ContextWithMemo from "./redux/ContextWithMemo";
// import reportWebVitals from "./reportWebVitals";
// import Parent from "./react-parent-child-render-test";
// import ReactRouteApp from "./react-router-test/demo/App";

import { Provider } from "./react-redux-learning/my-react-redux";
import store from "./react-redux-learning/store";
import App from "./react-redux-learning/App";
import TestContext from "./react-redux-learning/TestContext";

import ClosureTrap from "./react-closuretrap/closuretrap";

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
