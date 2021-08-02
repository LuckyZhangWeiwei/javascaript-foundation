/*
Monad 函子
函子的值也可能是函子，这样会出现多层函子嵌套的情况
Monad（单子不可分割的实体） 函子的作用是 总是返回一个单层的函子
它有一个flatMap方法，与map方法作用相同，
唯一的区别是如果生成了一个嵌套的函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况
*/

{
  class Functor {
    constructor(value) {
      this.value = value;
    }
    static of(value) {
      return new Functor(value);
    }
    map(fn) {
      return new Functor(fn(this.value));
    }
  }

  // 如果是fn的返回值是一个函子，那个会出现一个递归嵌套的情况，计算取值很麻烦
  // let result = Functor.of("a")
  //   .map((x) => Functor.of(x + 1))
  //   .map((x) => Functor.of(x + 2));

  let result = Functor.of("a")
    .map((x) => Functor.of(x + 1))
    .map((x) => Functor.of(x.value + 2));

  console.log(result);
}
{
  let a = [1, 2, 3].map((item) => [item + 1]);
  console.log(a);

  let a2 = [1, 2, 3].map((item) => item + 1);
  console.log(a2);

  let a3 = [1, 2, 3].flatMap((item) => [item + 1]);
  console.log(a3);
}
