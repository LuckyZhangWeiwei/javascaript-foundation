/*
1. 给元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的this就是当前操作的元素本身
2. 如何确定执行主体（this）是谁？ 当方法执行的时候， 我们看方法前是否有点，没有点是window 有点是点前面的整个对象
3. this 与在哪创建 在哪执行 作用域无关！！！

*/
{
  var name = "zhufeng";
  function fn() {
    console.log(this.name);
  }
  var obj = {
    name: "hello",
    fn: fn,
  };
  obj.fn(); // this -> obj
  fn(); // this - window
}
{
  (function () {
    console.log(this); // this -> window
  })();
}
{
  console.log(Array.__proto__.__proto__.hasOwnProperty());
}
{
  let obj = {
    fn: (function (n) {
      console.log(this); // this -> window
      return function () {
        console.log("this2:", this); // this -> obj
      };
    })(10),
  };
  obj.fn();
}
{
  var name = "name";
  function test() {
    console.log(name);
    setTimeout(() => {
      console.log(name);
    }, 0);
  }
  test();
}
{
  function fn() {
    console.log(this); // this -> window
  }
  document.body.onclick = function () {
    console.log(this); // this -> body
    fn();
  };
}
