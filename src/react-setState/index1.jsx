import Counter from "./index";
import { NoMode } from "./ReactTypeOfMode";
import { ClassComponent, HostRoot } from "./reactWorkTags";

let counterInstance = new Counter();

let mode = NoMode;

let rootFiber = {
  tag: HostRoot,
  updateQueue: [],
  mode,
};

let counterFiber = {
  tag: ClassComponent,
  updateQueue: [],
  mode,
};

counterFiber.stateNode = counterInstance;
counterInstance._reactInternals = counterFiber;

rootFiber.child = counterFiber;
counterFiber.return = rootFiber;
