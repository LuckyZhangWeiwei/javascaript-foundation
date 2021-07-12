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
    console.log(a, b, c);
    a = 100;
    c = 200;
    console.log(a, b, c);
  }

  b = fn(10);
  console.log(a, b, c);
}
