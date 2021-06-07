import React from "react";

import RouterContext from "./RouterContext.js";
import matchPath from "./matchPath.js";

class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = context.location; // 从RouterContext获取location

          let element, match; // 两个变量记录第一次匹配上的子元素和match属性

          React.Children.forEach(this.props.children, (child) => {
            if (!match && React.isValidElement(child)) {
              element = child;

              const path = child.props.path;

              match = matchPath(location.pathname, { ...child.props, path });
            }
          });

          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Switch;
