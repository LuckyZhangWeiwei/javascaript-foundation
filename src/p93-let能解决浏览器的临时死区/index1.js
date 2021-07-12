{
  console.log(typeof a); // => undefined 这个浏览器的bug，本应该报错，因为没有a （暂时性死区）
}
{
  console.log(typeof a); // => Cannot access 'a' before initialization
  let a;
}
