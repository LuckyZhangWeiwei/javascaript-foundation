{
  // 函子 maybe
  /*
  容器内部的值可能出现一个空值，而外部的函数未必有处理空值的机制，如果传入空值，可能出错
  函子可以过滤空值，被称作Maybe 函子
   */
  class Maybe {
    constructor(value) {
      this.value = value;
    }
    static of(value) {
      return new Maybe(value);
    }
    map(fn) {
      console.log("this:", this);
      return this.value ? new Maybe(fn(this.value)) : this;
    }
  }
  let maybe = Maybe.of(null).map((x) => x.toString());
  console.log(maybe);
}
