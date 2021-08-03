/*
IO 函子与副作用
副作用就是程序和外部世界交互，比如读取文件或调用接口
由于外部世界不可控，包含副作用的逻辑往往不要预测
函数式编程提倡把副作用分离出来，让没有副作用的纯逻辑房子一起远离包含副作用的逻辑， 这时就需要IO Monad
IO 就是input / output ， 副作用无非是对外部世界的input（读）和output （写）
IO 函子通过推迟执行的方法来实现对副作用的管理和隔离
*/
{
  const { compose } = require("lodash/fp");
  let localStorage = {
    getItem(key) {
      if (key === "data") {
        // 服务器返回结果
        return '{"code": 0, "userId": 1}';
      } else if (key === "1") {
        return '{"userId": 1, "name": "张三", "age": 18}';
      }
    },
  };
  // 按过程式编程
  function printUser() {
    let response = localStorage.getItem("data"); // 输入
    let data = JSON.parse(response);
    const userId = data.userId;
    const user = localStorage.getItem(userId.toString());
    console.log("user:", user); //输出
  }
  printUser();
}
{
  const { compose } = require("lodash/fp");

  let localStorage = {
    getItem(key) {
      if (key === "data") {
        // 服务器返回结果
        return '{"code": 0, "userId": 1}';
      } else if (key === "1") {
        return '{"userId": 1, "name": "张三", "age": 18}';
      }
    },
  };

  class IO {
    constructor(value) {
      this.value = value;
    }
    map(fn) {
      return new IO(compose(fn, this.value));
    }
    start(callback) {
      callback(this.value());
    }
    flatMap(fn) {
      return new IO(compose((x) => x.value(), fn, this.value));
    }
  }

  const readByKey = (key) => new IO(() => localStorage.getItem(key)); // 输入 有副作用
  const parseJSON = (str) => JSON.parse(str); // 无副作用
  const write = console.log; // 输出 有副作用

  // 把真正的执行 进行了延时，
  // let result = readByKey("data").map(parseJSON).start(write);

  let result = readByKey("data")
    .map(parseJSON)
    .map((x) => x.userId.toString())
    .flatMap(readByKey)
    .map(parseJSON)
    .start(write);
  console.log(result);
}
