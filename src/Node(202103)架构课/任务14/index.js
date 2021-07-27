{
  // "成功"
  let p = new Promise((resolve, reject) => {
    resolve();
    reject();
  });
  p.then(
    () => {
      console.log("成功");
    },
    () => {
      console.log("失败");
    }
  );
}
{
  // 1, 2, 3
  const p = new Promise((resolve, reject) => {
    console.log(1);
    resolve(); // resolve reject 没有终止代码的功能
    console.log(2);
  });
  p.then(() => {
    console.log(3);
  });
}
{
  // 不会执行catch 但是会穿透过去 ， 执行下面的then
  // 2
  Promise.resolve(1)
    .then((res) => 2)
    .catch((error) => 3)
    .then((res) => console.log(res));
}

{
  // 3
  Promise.reject(1)
    .then((res) => 2)
    .catch((error) => 3)
    .then((res) => console.log(res));
}

{
  // 如果 50 行 return error 则会执行54行
  // 如果 50 行 throw error, 则会走 55 行
  Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => {
      return new Error("error");
    })
    .catch(() => {
      return 1;
    })
    .then((x) => {
      return x + 1;
    })
    .then((x) => console.log(x))
    .catch(console.error);
}

{
  async function async1() {
    console.log("async1 start");
    await async2(); // 此行会立即执行
    console.log("async-next"); // 相当于上一行的promise 的then
  }
  async function async2() {
    console.log("async2");
  }
  console.log("script start");
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  async1();
  new Promise((resolve) => {
    console.log("Promise1");
    resolve();
  }).then(() => {
    console.log("promise2");
  });
  console.log("script end");
}
{
  Promise.resolve()
    .then(() => {
      console.log("then1");
      Promise.resolve()
        .then(() => {
          console.log("then1-1");
          return Promise.resolve(); // 如果then 中的方法返回一个promise 相当于 x.then
          // => x.then().then()
        })
        .then(() => {
          console.log("then1-2");
        });
    })
    .then(() => {
      console.log("then2");
    })
    .then(() => {
      console.log("then3");
    })
    .then(() => {
      console.log("then4");
    })
    .then(() => {
      console.log("then5");
    });
  // 队列是一个，因为是微任务创造的微任务
  // 下面是promise A+ 放回的结果，但是浏览器规定， 如果promise return 一个promise， 会额外在开辟一个异步方法（相当于又多了一次then => x.then().then()）
  // 1. [then1] 2. [then1-1, then2] 3.[x.then, then3] 4.[then4] 5.[then5]
  // 1. [then1] 2. [then1-1, then2] 3.[x.then, then3] 4.[x.then, then4] 5.[then1-2, then5]
}
