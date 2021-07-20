//https://www.cnblogs.com/loveyaxin/p/11151586.html
{
  function Person(age) {
    this.age = age;
  }

  Person.prototype.name = "kain";
  var person1 = new Person();
  var person2 = new Person();

  console.log(person1.name);
  console.log(person2.name);
  console.log(person1.__proto__ === Person.prototype);
  console.log(Object.getPrototypeOf(person1) === Person.prototype);
}
{
  function Person() {}
  console.log(Person === Person.prototype.constructor);
}

{
  function Person() {}
  Person.prototype.name = "kevin";
  let person = new Person();
  person.name = "Daisy";
  console.log(person.name);

  delete person.name;
  console.log(person.name);
}

{
  function Person(age) {
    this.age = age;
  }

  Person.prototype.name = "kavin";
  var person = new Person();

  // console.log(typeof Person.prototype)
  // console.log(Person.prototype.__proto__)
  // console.log(typeof Person.prototype.__proto__)
  console.log(Person.prototype.__proto__.constructor);
  // console.log(typeof Person.prototype.__proto__.constructor)
  console.log(Person.prototype.__proto__ === Object.prototype);
  console.log({}.toString.call(Person));
}

{
  function Person(age) {
    this.age = age;
  }
  console.log(Person.prototype.__proto__);
}
