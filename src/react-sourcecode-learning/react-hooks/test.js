let isMount = true;
let workingInProgressHook = null;

const fiber = {
  stateNode: App,
  memoizedState: null, // 链表
};

function useState(initialState) {
  let hook;
  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        /*这个环状链表保存 依次dispatch Action 中 可能有的多个 updateNum, */
        /*
          onClick() {
            updateNum((num) => num + 1);
            updateNum((num) => num + 2);
            updateNum((num) => num + 3);
          },
        */
        pending: null,
      },
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      /*
        首次渲染  但是有多个useState  
        const [num, updateNum] = useState(0);
        const [num, updateNum1] = useState(1);
        const [num, updateNum2] = useState(2);
      */
      workingInProgressHook.next = hook;
    }
    workingInProgressHook = hook;
  } else {
    hook = workingInProgressHook;
    // console.log(hook);
    workingInProgressHook = workingInProgressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    // 有新的update 要执行
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);
    // 计算后 清空
    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;
  // 因为dispatch action 要传入对应的queue 所以要bind
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

// updateNum
function dispatchAction(queue, action) {
  // 环状链表
  const update = {
    action,
    next: null,
  };
  if (queue.pending === null) {
    // 自己指向自己
    update.next = update;
  } else {
    // 多次调用 (后两次进入此else)
    /*
      updateNum((num) => num + 1);
      updateNum((num) => num + 2);
      updateNum((num) => num + 3);
    */
    // u0 -> u0
    // 变为 u1 -> u0 -> u1
    // queue.pending 保存最后一个update，queue.pending.next 则是第一个update
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  // 每次dispatch action 创建的update 就是换装链表的最后一个update
  queue.pending = update;

  schedule();
}

function schedule() {
  workingInProgressHook = fiber.memoizedState; // 每次调度 要复位一下 当前的正在工作的hook
  const app = fiber.stateNode();
  fiber.stateNode();
  isMount = false;
  return app;
}

function App() {
  const [num, updateNum] = useState(0);
  const [num1, updateNum1] = useState(1);
  // const [num2, updateNum2] = useState(2);
  return {
    onClick() {
      updateNum((num) => num + 1);
      updateNum((num) => num + 2);
      // updateNum((num) => num + 3);
    },
  };
}

global.app = schedule();
app.onClick();
