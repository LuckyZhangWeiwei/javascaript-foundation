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
/******************作用域***************************/
/*
变量提升
形参赋值
词法解析
*/
{
  console.log(a, b);
  var a = 12,
    b = 12;
  function fn() {
    console.log(a, b);
    var a = (b = 13);
    console.log(a, b);
  }
  fn();
  console.log(a, b);
}

{
  console.log(a, b, c);
  var a = 12,
    b = 13,
    c = 14;
  function fn(a) {
    // 形参的a 为 私有变量
    console.log(a, b, c);
    a = 100;
    c = 200;
    console.log(a, b, c);
  }
  b = fn(10);
  console.log(a, b, c);
}

{
  // 数组是引用类型
  var arr = [12, 23];
  function fn(arr) {
    console.log(arr);
    arr[0] = 100; // 传进来的arr， 修改的是原始的arr
    arr = [100]; // 执行此行时 会再开辟一个内存区 ， 此时的arr 就不是传进来的arr了
    arr[0] = 0;
    console.log(arr);
  }
  fn(arr);
  console.log(arr);
}
// 作用域链的查找
/*
1. 从函数创建开始 作用域就已经指定好了
2. 当前的函数是在那个作用域（n）下创建的，那么函数执行形成的作用域（m）的上级作用域就是n，
和函数在哪执行没关系，只和创建的地方有关
*/
{
  var n = 1;
  function fn() {
    var n = 2;
    function f() {
      n--;
      console.log(n);
    }
    fn;
    return f;
  }
  var x = fn();
  x();
  console.log(n);
}
/*****************闭包*******************************/
// 函数执行就会生成栈内存
// 引用类型 占用堆内存
{
  var i = 5;
  function fn(i) {
    return function (n) {
      console.log(n + ++i);
    };
  }

  var f = fn(1);
  f(2);
  f(3)(4);
  f(5)(6);
  f(7);
  console.log(i);
}

{
  var a = 456;
  function test() {
    var a = "123";
    return function test2() {
      console.log(this);
      return this.a;
    };
  }
  var obj = {
    a: 789,
  };
  var fn = test();
  // var a = console.log(fn());
  var a = fn.call(obj);
  console.log(a);
}
