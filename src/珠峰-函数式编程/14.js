class Functor {
  constructor(value) {
    this.value = value;
  }
  static of(value) {
    return new Functor(value);
  }
  map(fn) {
    return new Functor(fn(this.value));
  }
}
