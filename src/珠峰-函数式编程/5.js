// 柯里化
{
  let _ = require("lodash");
  function add(a, b, c) {
    return a + b + c;
  }
  let curriedAdd = _.curry(add);
  console.log(curriedAdd(1, 2, 3));
  console.log(curriedAdd(1)(2, 3));
  console.log(curriedAdd(1)(2)(3));
}
{
  function curry(func) {
    const paramsLen = func.length; // 形参的个数
    let curried = (...args) => {
      if (args.length < paramsLen) {
        return (...current) => {
          console.log(...current);
          return curried(...args, ...current);
        };
      }
      return func(...args);
    };
    return curried;
  }
  function add(a, b, c) {
    return a + b + c;
  }
  let curriedAdd = curry(add);
  // console.log(curriedAdd(1, 2, 3));
  // console.log(curriedAdd(1)(2, 3));
  let fn = curriedAdd(1); // args 保持闭包变量 add 函数中的 params 被curry 函数引用
  console.log(fn(2, 3));
}
