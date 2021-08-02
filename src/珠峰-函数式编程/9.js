{
  // Container
  // 如果一个对象内部能有一个值，我们就称他为一个容器
  class Container {
    constructor(value) {
      this.value = value;
    }
  }
  let container = new Container(1);
  console.log(container.value);
}

{
  // Pointed Container
  // 如果一个容器里面有of 方法，我们就称它为有指向的容器
  // 函数式编程 使用的时候尽可能不要new 对象，写一个类似于静态工厂的类实例（of）
  class PointedContainer {
    constructor(value) {
      this.value = value;
    }
    static of(value) {
      return new PointedContainer(value);
    }
  }

  let pointedContainer = PointedContainer.of(1);
  console.log(pointedContainer.value);
}

{
  // 函子有点像函数
  // 函数其实就是一个映射关系，可以把参数映射返回值
  // map也是映射的意思，可以把老的实例映射为一个新的实例
  // 也可以说可以把一个老的值，映射为新的值
  class Functor {
    constructor(value) {
      this.value = value;
    }
    static of(value) {
      return new Functor(value);
    }
    // 如果它还有一个map方法，可以接受一个函数 返回值还是一个同类型的对象，它就是一个函子
    map(fn) {
      return new Functor(fn(this.value));
    }
  }
  let functor = Functor.of(1)
    .map((x) => x.toString())
    .map((x) => x + 1)
    .map((x) => x + 2)
    .map((x) => x + 3);
  console.log(functor);
}
