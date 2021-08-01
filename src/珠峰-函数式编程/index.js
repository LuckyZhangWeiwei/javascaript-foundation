function add(a, b) {
  return a + b;
}
let add1 = add;

function exec(fn, a, b) {
  return fn(a, b);
}
let result = exec(add, 1, 2);
console.log(result);

function exec2(fn) {
  return function (a, b) {
    return fn(a, b);
  };
}

let result2 = exec2(add)(2, 4);
console.log(result2);
