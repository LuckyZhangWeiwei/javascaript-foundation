// 变量提升 当浏览器开辟出供代码执行的栈内存后，代码并没有自上而下立即执行，
// 而是继续做了一些事情：
// 把当前作用域中所有带var /function 关键字进行提前定义和声明
// 带var的只是提前声明（declare）"var a;" 如果只声明没有赋值，默认值是undefined
// 带function的不仅声明，而且还定义（defined） “a=13” 定义就是赋值 ， 准确来说就是让变量和某个值进行关联
{
  console.log("a1", a);
  var a = 12;
  var b = a;
  b = 13;
  console.log("a2", a);
}
{
  console.log(sum(10, 30));
  function sum(n, m) {
    return n + m;
  }
}
{
  // 带var的 变量提升阶段  只会提升 sum = undefined
  // 函数表达式方式，由于使用var 来创建sum，变量提升阶段只会声明变量，不会赋值，所以此时函数再前面执行，
  // 函数是没有值的，不能执行
  // 相对于上面 更加严谨，但是容错低，推荐
  console.log(sum(1, 2));
  var sum = function (n, m) {
    return n + m;
  };
}
{
  var n = 1;
  function fn() {
    var n = 2;
    function fn() {
      n--;
      console.log(n);
    }
    fn();
    return fn;
  }
  var x = fn();
  x();
  console.log(n);

  //1
  //0
  //1
}
