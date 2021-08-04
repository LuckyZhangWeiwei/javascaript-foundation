// 从根节点开始渲染和调度
// 两个阶段
// 第一个阶段： diff 阶段 对比新旧虚拟dom，进行增量，更新 创建render 阶段比较花时间，我们可以对任务进行拆分，拆分的维度是虚拟dom，此阶段可以暂停
// render 阶段 俩任务 1. 根据虚拟dom 生成fiber， 2. 收集effect list
// diff 等于render
// 第二个阶段： commit 阶段，进行dom 更新，此阶段不可以暂停

import {
  ELEMENT_TEXT,
  TAG_HOST,
  TAG_ROOT,
  TAG_TEXT,
  PLACEMENT,
} from "./constants";

import { setProps } from "./utils";

/*
 let rootFiber = {
    tag: TAG_ROOT,
    stateNode: container,
    props: { children: [element] },
  };
 */
let nextUnitOfWork = null; // 下一个工作单元
let workInProgressRoot = null; // RootFiber应用的根

export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = rootFiber;
}
// 循环执行工作
function workLoop(deadline) {
  let shouldYield = false; // 是否让出时间片或者说控制权
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行完一个任务后
    shouldYield = deadline.timeRemaining() < 1; // 没有时间了，要让出控制权
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log("render阶段结束");
    commitRoot();
  } else {
    // 如果还有任务，则向浏览器申请时间片，再次调度
    requestIdleCallback(workLoop, { timeout: 500 });
  }
}
// react 告诉浏览器 我现在有任务请你再空闲的时间执行
requestIdleCallback(workLoop, { timeout: 500 });

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber); //处理此fiber
  // 如果有儿子，则返回大儿子
  if (currentFiber.child) {
    return currentFiber.child;
  }
  // 走到这，说明没有儿子,则此fiber已经完成
  while (currentFiber) {
    completeUnitOfWork(currentFiber); // 此fiber遍历结束
    // 如果没有儿子，怎开始找弟弟
    if (currentFiber.sibling) {
      return currentFiber.sibling;
    }
    // 没有儿子，在找叔叔，-> 先找到父亲，再找父亲的弟弟
    currentFiber = currentFiber.return;
  }
}

// 创建真实的dom
// 创建子fiber
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber);
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber);
  } else if (currentFiber.tag === TAG_HOST) {
    // 原生dom节点
    updateHostComponent(currentFiber);
  }
}

function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children; // [element]
  reconcileChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber) {
  // 如果此fiber没有创建dom节点
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber);
  }
}

function updateHostComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber);
  }
  const newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    // 文本节点
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) {
    // 原生dom节点 span div
    let stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props); // 更新dom 的属性
    return stateNode;
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps);
}

// currentFiber 父fiber
// newChildren 为父fiber 下的子节点 虚拟dom
function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0; // 新的子节点的索引
  let prevSibling; // 上一个新的子fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]; // 取出虚拟dom节点
    let tag;
    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT; // 文本节点
    } else if (typeof newChild.type === "string") {
      tag = TAG_HOST; // 原生dom节点
    }
    // 创建子fiber - > 有虚拟dom 转化fiber
    let newFiber = {
      tag, // TAG_HOST
      type: newChild.type, // div
      props: newChild.props,
      stateNode: null, // div 还没有创建真正的dom节点
      return: currentFiber, // 父fiber， returnFiber
      effectTag: PLACEMENT, // 副作用标识， render 阶段我们会收集副作用 增加 删除 修改节点
      nextEffect: null, // effect list是单链表
      // effect list 的顺序很完成顺序一致
    };
    // 最新的儿子没有弟弟
    if (newFiber) {
      if (newChildIndex === 0) {
        // 当前索引为0， 说明是太子
        currentFiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber; // 让太子的sibling弟弟指向二皇子
      }
      prevSibling = newFiber;
    }
    newChildIndex++;
  }
}

// 搜集effect 然后组成effect list
// 每个fiber 有两个属性 first effect 指向第一个有副作用的子fiber， last effect 指向最后一个有副作用的fiber
// 中间的用next effect 链接 形成一个单链表
function completeUnitOfWork(currentFiber) {
  // current B1
  let returnFiber = currentFiber.return;
  if (returnFiber) {
    // 把b1 的first last 给A
    // 把自己儿子的链 挂到父亲身上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (!!currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      } else {
        returnFiber.lastEffect = currentFiber.lastEffect;
      }
    }
    //把自己挂到父亲身上
    const effectTag = currentFiber.effectTag;
    if (effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      returnFiber.lastEffect = currentFiber;
    }
  }
}

function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}

function commitWork(currentFiber) {
  if (!currentFiber) return;
  let returnFiber = currentFiber.return;
  let returnDOM = returnFiber.stateNode;
  if (currentFiber.effectTag === PLACEMENT) {
    returnDOM.appendChild(returnFiber.stateNode);
  }
  currentFiber.effectTag = null;
}
