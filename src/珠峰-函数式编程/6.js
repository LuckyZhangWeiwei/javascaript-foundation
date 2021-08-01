// 组合
{
  let str = "a";
  const add1 = (str) => str + 1;
  const add2 = (str) => str + 2;
  const add3 = (str) => str + 3;
  console.log(add1(add2(add3(str))));
}
{
  let _ = require("lodash");
  const add1 = (str) => str + 1;
  const add2 = (str) => str + 2;
  const add3 = (str) => str + 3;
  let flowed = _.flow(add3, add2, add1);
  let r1 = flowed("a");
  console.log(r1);
}
{
  const add1 = (str) => str + 1;
  const add2 = (str) => str + 2;
  const add3 = (str) => str + 3;
  function flow(...fns) {
    if (fns.length === 1) {
      return fns[0];
    }
    return fns.reduce((a, b) => {
      console.log(b.name);
      return (...args) => a(b(...args));
    });
  }
  let flowed = flow(add3, add2, add1);
  let fn = flowed("a");
  console.log(fn);
}
