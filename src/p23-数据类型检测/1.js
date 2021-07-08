// 基于typeof 检测
// 1. 首先是一个字符串
// 2. 字符串中包含对应的类型
// 3. 局限性
// 1. typeof null = object （空指针）， 但是null 不是对象
// 2. 无法区分 object array regex ， 应为都是返回object
console.log(typeof 1);

// NaN 是number 类型
let a = NaN;
console.log(typeof a);

console.log(typeof null);

console.log(typeof undefined);

console.log(function () {});

{
  // 运算顺序 从右向左 执行
  console.log(typeof typeof typeof []);
  // typeof []  "object"
  // typeof "object" "string"
  // typeof "string" "string", 注意双引号
}
