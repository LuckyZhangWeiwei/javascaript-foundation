let rootFiber = require("./element");
let nextUnitOfWork = null; // 下一个执行单元

function workLoop() {
  // 如果有待执行的执行单元,就执行，然后返回下一个执行单元
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork) {
    console.log("render阶段结束");
  }
}

// 刚开始A1
function performUnitOfWork(fiber) {
  beginWork(fiber); //处理此fiber
  // 如果有儿子，则返回大儿子
  if (fiber.child) {
    return fiber.child;
  }
  // 走到这，说明没有儿子,则此fiber已经完成
  while (fiber) {
    completeUnitOfWork(fiber); // 此fiber遍历结束
    // 如果没有儿子，怎开始找弟弟
    if (fiber.sibling) {
      return fiber.sibling;
    }
    // 没有儿子，在找叔叔，-> 先找到父亲，再找父亲的弟弟
    fiber = fiber.return;
  }
}

function beginWork(fiber) {
  console.log("开始：", fiber.key);
}

function completeUnitOfWork(fiber) {
  console.log("结束：", fiber.key);
}

nextUnitOfWork = rootFiber;
workLoop();
