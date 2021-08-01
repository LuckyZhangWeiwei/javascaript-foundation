{
  let _ = require("lodash");
  function add(a, b) {
    console.log("add");
    return a + b;
  }
  const resolver = (...args) => JSON.stringify(args);
  const memorizedAdd = _.memoize(add, resolver);
  console.log(memorizedAdd(1, 2));
  console.log(memorizedAdd(1, 2));
  console.log(memorizedAdd(1, 2));
  console.log(memorizedAdd(1, 3));
}
{
  function memorize(fun, resolver) {
    let cache = {};
    let memorized = (...args) => {
      console.log("args:", ...args);
      const key = resolver(...args);
      if (cache[key]) {
        return cache[key];
      } else {
        cache[key] = fun(...args);
        return cache[key];
      }
    };
    return memorized;
  }

  function add(a, b) {
    console.log("add");
    return a + b;
  }
  const resolver = (...args) => JSON.stringify(args);
  const memorizedAdd = memorize(add, resolver);
  console.log(memorizedAdd(1, 2));
  console.log(memorizedAdd(1, 2));
  console.log(memorizedAdd(1, 2));
  console.log(memorizedAdd(1, 3));
}
