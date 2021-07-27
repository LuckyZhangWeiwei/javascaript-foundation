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
{
  // 实现类继承
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.setAge = function () {
    console.log("setAge");
  };
  function Student(name, age, price) {
    Person.call(this, name, age);
    this.price = price;
    this.setScore = function () {};
  }
  Student.prototype = Object.create(Person.prototype);
  Student.prototype.constructor = Student;
  var s1 = new Student("tom", 20, 15000);
  console.log(s1 instanceof Student, s1 instanceof Person);
  console.log(s1.constructor);
  console.log(s1);
  console.log(Person.prototype === Object.create(Person.prototype));
}

{
  class Person {
    //调用类的构造方法
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    //定义一般的方法
    showName() {
      console.log("调用父类的方法");
      console.log(this.name, this.age);
    }
  }
  let p1 = new Person("kobe", 39);
  console.log(p1);
  //定义一个子类
  class Student extends Person {
    constructor(name, age, salary) {
      super(name, age); //通过super调用父类的构造方法
      this.salary = salary;
    }
    showName() {
      //在子类自身定义方法
      console.log("调用子类的方法");
      console.log(this.name, this.age, this.salary);
    }
  }
  let s1 = new Student("wade", 38, 1000000000);
  console.log(s1);
  s1.showName();
}
