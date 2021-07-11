{
  Promise.resolve().then(() => {
    console.log("promise1");
    setTimeout(() => {
      console.log("setTimeout2");
    }, 0);
  });
  setTimeout(() => {
    console.log("setTimeout1");
    Promise.resolve().then(() => {
      console.log("promise2");
    });
  }, 0);
}
// 微任务[promise1]
// 宏任务 [setTimeout1]
// 微任务[promise1] 进栈执行 -> [], 宏任务 -> [setTimeout1, setTimeout2]
// 宏任务[setTimeout1] 进栈执行 -> [setTimeout2], 再向 微任务加入[promise2]
// 宏任务[setTimeout2] 进栈执行
// 微任务[promise2] 进栈执行
