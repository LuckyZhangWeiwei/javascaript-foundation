import { TAG_ROOT } from "./constants";
import { scheduleRoot } from "./schedule";

function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT,
    stateNode: container,
    // props.children 是一个数组，里面放的是react 元素（虚拟dom，不是fiber！！），后面会根据每一个react 元素，创建fiber
    props: { children: [element] },
  };
  // 开始调度
  scheduleRoot(rootFiber);
}

const ReactDOM = {
  render,
};

export default ReactDOM;
