function fun1() {
  console.log("fun1");
}

function b(next) {
  // console.log(next.toString())
  return function () {
    console.log("b");
    next();
  };
}

function a(next) {
  return function () {
    console.log("a");
    next();
  };
}

b(fun1);

// function () {
// 	console.log("b")
// 	console.log("fun1")
// }

a(b(fun1));

// function() {
// 	console.log("a")
// 	console.log("b")
// 	console.log("fun1")
// }

a(b(fun1))();

/*****************/
// function compose(...funcs) {
//   return funcs.reduce(
//     (a, b) =>
//       (...args) =>
//         a(b(...args))
//   );
// }

// const newDispatchGen = compose(...chain);
// // 执行这个函数得到newDispatch
// const newDispatch = newDispatchGen(dispatch);
