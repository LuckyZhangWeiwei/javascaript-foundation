import { SyncLane } from "./ReactFiberLane";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

let classComponentUpdater = {
  enqueueSetState(inst, payload) {
    let fiber = get(inst);
    let eventTime = requestEventTime();
    // 计算本次更新的优先级
    var lane = requestUpdateLane(fiber);

    let update = createUpdate(eventTime, lane);
    update.payload = payload; //{number: 1}

    enqueueUpdate(fiber, update);

    scheduleUpdateOnFiber(fiber);
  },
};

function requestEventTime() {
  // 程序从启动到当前的时间，用来计算任务的过期时间
  return performance.now;
}

function requestUpdateLane(fiber) {
  return SyncLane;
}

function createUpdate(eventTime, lane) {
  return {
    eventTime,
    lane,
  };
}

function enqueueUpdate(fiber, update) {
  fiber.updateQueue.push(update);
}

function get(inst) {
  return inst._reactInternals;
}

export default class Component {
  constructor() {
    this.updater = classComponentUpdater;
  }
  setState(partialState) {
    this.updater.enqueueSetState(this, partialState);
  }
}
