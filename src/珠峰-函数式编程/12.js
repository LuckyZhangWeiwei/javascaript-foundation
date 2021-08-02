/*
ap（application） 函子 拥有ap方法
ap方法可以让函子内的函数可以使用另一个函子的值进行计算
ap方法的参数不是函数，而是一个函子
*/

class Ap {
  constructor(value) {
    this.value = value;
  }
  static of(value) {
    return new Ap(value);
  }
  map(fn) {
    return new Ap(value);
  }
  ap(functor) {
    return Ap.of(this.value(functor.value));
  }
}
let A = Ap.of((x) => x + 1);
let B = Ap.of(1);
let result = A.ap(B);
console.log(result);
