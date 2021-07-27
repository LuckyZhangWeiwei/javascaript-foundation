{
  /*
  通过原型链可以找到的都是公有属性，在自己堆内存的叫做私有属性
  hasOwnProperty 检测某个属性是否问当前对象的私有属性
  in 检测当前属性是否属于这个对象 （不管私有还是公有属性，只要是这个对象的属性， 就为true）
  自己堆中有的就是私有属性，通过__proto__查找的就是共有属性
  */
  let ary = [10, 20, 30];
  console.log("0" in ary);
  console.log("push" in ary);
  console.log("--------------------------");
  console.log(ary.hasOwnProperty("0"));
  console.log(ary.hasOwnProperty("push"));
  console.log("--------------------------");
  console.log(Array.prototype.hasOwnProperty("push"));
  console.log(Array.prototype.hasOwnProperty("hasOwnProperty"));
}
{
  function Fn() {
    this.y = 200;
    this.say = function () {};
  }
  Fn.prototype.eat = function () {};
  Fn.prototype.say = function () {};
  var f1 = new Fn();
  var f2 = new Fn();
  console.log(f1.__proto__ === Fn.prototype);
}
{
  // 检测某个属性是否为对象的公有属性： hasPubProperty
  // 是这个对象的属性，但不是私有的
  Object.prototype.hasPubProperty = function (property) {
    // 验证传递的属性合法性（一般只能是数组或者字符串等基本值）
    if (!["string", "number", "boolean"].includes(typeof property)) {
      return false;
    }
    // 开始验证为公有属性
    let n = property in this,
      m = this.hasOwnProperty(property);
    return n === true && m === false;
  };
  console.log(Array.prototype.hasPubProperty("push"));
  console.log([].hasPubProperty("push"));
}
