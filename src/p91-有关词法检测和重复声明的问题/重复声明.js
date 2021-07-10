{
  var a = 12;
  var a = 13;
  console.log(a);
}
{
  let a = 12;
  let a = 13;
  console.log(a);
}
{
  // 下面的代码一行也不会执行，在执行代码前，要进行此法检测，这一步通不过
  console.log(1);
  let a = 12;
  console.log(a);
  let a = 13;
  console.log(a);
}
{
  // let 不允许重新声明，所以在词法解析阶段就报错！
  console.log(a);
  var a = 12;
  let a = 13;
  console.log(a);
}
{
  fn();
  function fn() {
    console.log(1);
  }
  fn();
  function fn() {
    console.log(2);
  }
  fn();
  var fn = function () {
    console.log(3);
  };
  fn();
  function fn() {
    console.log(4);
  }
  fn();
  function fn() {
    console.log(5);
  }
  fn();
}
