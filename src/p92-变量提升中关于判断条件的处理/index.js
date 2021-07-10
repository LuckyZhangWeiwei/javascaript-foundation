{
  // 不管条件是否成立都要进行变量提升！！！
  console.log(a);
  if (!("a" in window)) {
    var a = 13;
  }
  console.log(a);
}
{
  // fn 特殊
  // fn 只允许提前声明，并没有提前定义和关联（老版本的浏览器是声明和定义的）
  console.log(fn);
  if ("fn" in window) {
    // 如果条件成立，进入条件后的第一件事是给fn赋值
    fn();
    function fn() {
      console.log("aaa");
    }
  }
  fn();
}

{
  f = function () {
    return true;
  };
  g = function () {
    return false;
  };
  ~(function () {
    // 函数自执行会形成一个私有的作用域
    // 变量提升 function g;
    // 满足if 条件后才会 声明fn （开一个堆内存），但是在if的时候就已经执行g(), 所以会报错
    if (g() && [] == ![]) {
      f = function () {
        return false;
      };
      function g() {
        return true;
      }
    }
  })();
  console.log(f());
  console.log(g());
}
