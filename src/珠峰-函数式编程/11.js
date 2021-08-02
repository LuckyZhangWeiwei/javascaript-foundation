{
  // 函子 either 内部有俩个值 , left 值， right 值
  /*
  左值只会在右值不存在的情况下起作用
  可以处理默认值
   */
  class Either {
    constructor(left, right) {
      this.left = left;
      this.right = right;
    }
    static of(left, right) {
      return new Either(left, right);
    }
    map(fn) {
      return this.right
        ? Either.of(this.left, fn(this.right))
        : Either.of(fn(this.left), this.right);
    }
    get value() {
      return this.right || this.left;
    }
  }
  // let response = { name: "张三", gender: null };
  // let either = Either.of("男", response.gender).map((x) => `性别:${x}`);
  // console.log(either.value);

  function parseJson(str) {
    try {
      return Either.of(null, JSON.parse(str));
    } catch (error) {
      return Either.of({ message: error.message }, null);
    }
  }
  let result = parseJson("{age: 18}");
  console.log(result.value);
}
