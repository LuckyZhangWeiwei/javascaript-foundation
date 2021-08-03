// 单子 Monad
class Monad {
  constructor(value) {
    this.value = value;
  }
  static of(value) {
    return new Monad(value);
  }
  map(fn) {
    // console.log(fn.toString(), typeof this.value);
    return new Monad(fn(this.value));
  }
  join() {
    return this.value;
  }
  flatMap(fn) {
    // 本身是函子的值也是一个函子，把值取出来
    return this.map(fn).join();
  }
}

let result = Monad.of("hello")
  .map((x) => Monad.of(x + 1))
  .map((x) => Monad.of(x + 2))
  .map((x) => Monad.of(x + 3));

console.log(result);

let result2 = Monad.of("hello")
  .flatMap((x) => Monad.of(x + 1))
  .flatMap((x) => Monad.of(x + 2))
  .flatMap((x) => Monad.of(x + 3));

console.log(result2);
