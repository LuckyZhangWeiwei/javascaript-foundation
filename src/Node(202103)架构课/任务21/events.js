const EventsEmitter = require("./模拟events模块/events");
const util = require("util");

// 发布订阅模式
// 订阅依次
// 订阅方式
// 发布方式
// 取消订阅

function Girl() {}

util.inherits(Girl, EventsEmitter); // 原型继承， 需要通过实例来调用继承的方法

let girl = new Girl();

const cry = () => {
  console.log("cry");
};

const eat = () => {
  console.log("eat");
};

const shopping = () => {
  console.log("shopping");
};

girl.on("lovelorn", cry);

girl.on("lovelorn", eat);

girl.once("lovelorn", shopping);

setTimeout(() => {
  girl.off("lovelorn", shopping);
  girl.emit("lovelorn");
  girl.off("lovelorn", cry);
  girl.emit("lovelorn");
}, 2000);

// 继承 实例属性， 继承原型属性
//***************** 原型继承 *********************************************
// Girl.prototype.__proto__ = EventsEmitter.prototype;
//Object.setPrototypeOf(Girl.prototype, EventsEmitter.prototype); // 两种方式都行 es6 的写法 不用操作原型链
// Girl.prototype = Object.create(EventsEmitter.prototype); // 也行

{
  const EventsEmitter = require("events");
  // Object.create(EventsEmitter.prototype) 原理
  // 相当于把Girl 的原型重写， 重写后Girl的原型 具有父亲的原型上所有的属性
  function Girl() {}

  Girl.prototype = create(EventsEmitter.prototype);

  function create(proto) {
    function Fn() {}
    Fn.prototype = proto;
    return new Fn();
  }

  console.dir(Girl.prototype.__proto__);
}
