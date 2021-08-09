import React from "react";
import ReactDOM from "react-dom";

const jsxElement = (
  <div>
    <h1 style={{ color: "red" }}>Hello</h1>
    <h1 style={{ color: "green" }}>World</h1>
  </div>
);

const vDom = React.createElement(
  "div",
  null,
  /*#__PURE__*/ React.createElement(
    "h1",
    {
      style: {
        color: "red",
      },
    },
    "Hello"
  ),
  /*#__PURE__*/ React.createElement(
    "h1",
    {
      style: {
        color: "green",
      },
    },
    "World"
  )
);

console.log(JSON.stringify(vDom, null, 2));

ReactDOM.render(vDom, document.getElementById("root"));
