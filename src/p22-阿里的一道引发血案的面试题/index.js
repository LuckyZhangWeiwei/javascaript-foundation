{
  let a = {
    n: 1,
  };
  let b = a;

  // 连等 相当于 a.x = {n:2}   a = {n:2}
  a.x = a = {
    n: 2,
  };

  console.log(a.x);
  console.log(b);
}
{
  // 死循环
  let a = { n: 1 };
  let b = a;
  a.x = b;
  console.log(a);
  console.log(b);
}
