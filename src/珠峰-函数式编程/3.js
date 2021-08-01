// 纯函数
// 相同的输入 一定相同的输出
// 执行过程没有副作用
{
  // 纯函数
  function add(a, b) {
    return a + b;
  }

  // 不是纯函数
  let c = 2;
  let d = 2;
  function add2(a, b) {
    d++; // 修改了出自身作用域以外的变量
    return a + b + c;
  }
}
