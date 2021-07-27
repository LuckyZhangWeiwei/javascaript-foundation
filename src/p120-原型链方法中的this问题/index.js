{
  /*
  面向对象中有关公有/私有方法中的this问题
  1. 方法执行 看前面是否有点 点前面是谁 this 就是谁
  2. 把方法总的this 进行替换
  3. 再基于原型链查找的方法确定结果即可
  */
  function Fn() {
    this.x = 100; // this 为f1
    this.y = 200;
    this.say = function () {
      console.log(this.x);
    };
  }
  Fn.prototype.eat = function () {
    console.log(this.x + this.y);
  };
  Fn.prototype.say = function () {
    console.log(this.y);
  };
  Fn.prototype.write = function () {
    this.z = 1000;
  };
  let f1 = new Fn();
  f1.say(); // this 为f1
  f1.eat();
  f1.__proto__.say(); // this 为f1.__proto__ -> Fn的prototype 对象， 到原型对象上找y 没有所以为undefined
  Fn.prototype.eat(); // undefined + undefined -> NaN
  f1.write(); // f1.z = 1000 给f1 设置一个私有属性
  Fn.prototype.write(); // 给Fn的原型对象上 设置一个属性 1000
}
