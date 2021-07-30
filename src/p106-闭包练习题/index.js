var a = 9;
function fn() {
  a = 0;
  return function (b) {
    return b + a++;
  };
}
var f = fn();
console.log(f(5)); // 6
console.log(fn()(5)); // 7
console.log(f(5)); // 8
console.log(a); // 3
