import { ClassComponent, HostRoot } from "./reactWorkTags";
import { SyncLane } from "./ReactFiberLane";
import { ConcurrentMode } from "./ReactTypeOfMode";

var syncLanePriority = 12;
var NoLanePriority = 0;

let syncQueue = [];
let NoContext = 0;
let BatchedContext = 1;
let executionContext = NoContext;

export function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  let root = markUpdateLaneFromFiberToRoot(fiber);
  // 开始创建一个任务， 从根节点开始进行更新
  ensureRootIsScheduled(root);

  if (
    executionContext === NoContext &&
    (fiber.mode & ConcurrentMode) === NoMode
  ) {
    flushSyncCallbackQueue();
  }
}

function markUpdateLaneFromFiberToRoot(fiber) {
  let parent = fiber.return;
  while (parent) {
    fiber = parent;
    parent = parent.return;
  }
  if (fiber.tag === HostRoot) {
    return fiber;
  }

  return null;
}

function ensureRootIsScheduled(root) {
  let nextLanes = SyncLane;
  // 按理来说应该等于最高的级别赛道的优先级 12
  let newCallbackPriority = syncLanePriority;
  // 当前根节点上正在执行的更新的任务的优先级
  var existingCallbackPriority = root.callbackPriority;

  if (existingCallbackPriority === newCallbackPriority) {
    // 如果这个新的更新和当前根节点的已经调度的更新相等， 那就直接返回， 不用创建新的更新
    // 在并发模式，即使在setTimeout里也是批量更新的原因
    return;
  }
  scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));

  queueMicrotask(flushSyncCallbackQueue);

  root.callbackPriority = newCallbackPriority;
}

// performSyncWorkOnRoot函数添加到一个队列里，等待执行
function scheduleSyncCallback(callback) {
  syncQueue.push(callback);
}

// 真正的渲染任务
// 比较新老节点 得到dom diff 更新dom 都在这个方法里
// (调和)
function performSyncWorkOnRoot(workInProgress) {
  let root = workInProgress;
  console.log("开始执行调和任务");
  while (workInProgress) {
    if (workInProgress.tag === ClassComponent) {
      // 获取此fiber对应的类组件的实例
      let inst = workInProgress.stateNode;
      inst.state = processUpdateQueue(inst, workInProgress);
      // 得到新的状态后就可以渲染
      inst.render();
    }
    workInProgress = workInProgress.child;
  }
  commitRoot(root);
}

// 根据老状态和我们的更新队列计算新状态
function processUpdateQueue(inst, fiber) {
  return fiber.updateQueue.reduce((state, { payload }) => {
    if (typeof payload === "function") {
      payload = payload(state);
    }
    return {
      ...state,
      ...payload,
    };
  }, inst.state);
}

function commitRoot(root) {
  root.callbackPriority = NoLanePriority;
}

function flushSyncCallbackQueue() {
  syncQueue.forEach((cb) => cb());
  syncQueue.length = 0;
}

export function batchedUpdate(fn) {
  let prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  fn();
  executionContext = prevExecutionContext;
}
