{
  var ary = [1, 2, 3, 4];
  function fn(ary) {
    ary[0] = 0;
    ary = [0];
    ary[0] = 100;
    return ary;
  }
  var res = fn(ary);
  console.log(ary);
  console.log(res);
}
{
  var test = (function (i) {
    return function () {
      alert((i *= 2));
    };
  })(2);
  test(5);
}
{
  var a = 1;
  var obj = {
    name: "tom",
  };
  function fn() {
    var a2 = a;
    obj2 = obj;
    a2 = a;
    obj2.name = "jack";
  }
  fn();
  console.log(a);
  console.log(obj);
}
{
  var a = 1;
  function fn(a) {
    console.log(a);
    var a = 2;
    function a() {}
  }
  fn(a);
}
{
  fn(); // 3
  function fn() {
    console.log(1);
  }
  fn(); // 3
  function fn() {
    console.log(2);
  }
  fn(); // 3
  var fn = 10;
  fn(); // 10() - >error
  function fn() {
    console.log(3);
  }
  fn();
}
{
  var a = 0,
    b = 0;

  function A(a) {
    A = function (b) {
      alert(a + b++);
    };
    alert(a++);
  }
  A(1);
  A(2);
}
