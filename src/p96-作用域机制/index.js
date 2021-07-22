{
  var n = 1;
  function fn() {
    var n = 2;
    function f() {
      n--;
      console.log(n);
    }
    f();
    return f;
  }
  var x = fn();
  x();
  console.log(n);
}
{
  var i = 0;
  function A() {
    var i = 10;
    function x() {
      console.log(i);
    }
    return x;
  }
  var y = A();
  y();

  function B() {
    var i = 20;
    y();
  }
  B();
}
