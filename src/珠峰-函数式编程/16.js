{
  const Task = (execute) => {
    return {
      execute,
      map: (fn) => Task((resolve) => execute((x) => resolve(fn(x)))),
    };
  };
  function get(url) {
    return Promise.resolve({ code: 0, userId: 1 });
  }
  const request = (url) => Task((resolve) => get(url).then(resolve));
  request("data")
    .map((x) => x.userId)
    .execute((data) => console.log(data));
}
