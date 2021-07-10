{
  console.log(a);
  var a = 12;
  a = 13;
  console.log(a);
}
{
  console.log(a);
  let a = 12;
  a = 13;
  console.log(a);
}
{
  console.log(a);
  a = 13; // 如果没有上面一行， 直接a = 13， 不是声明一个变量a，而是给window 增加一个属性 a， window.a = 13
  console.log(a);
}
{
  var b = 14;
  console.log(b);
  console.log(global.b);
}
