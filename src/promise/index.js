{
  setTimeout(() => {
    console.log(0);
  }, 0);

  new Promise((resolve, reject) => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);

      new Promise((resolve, reject) => {
        console.log(3);
        resolve();
      })
        .then(() => {
          console.log(4);
        })
        .then(() => {
          console.log(5);
        });
    })
    .then(() => {
      console.log(6);
    });

  new Promise((resolve, reject) => {
    console.log(7);
    resolve();
  }).then(() => {
    console.log(8);
  });
}

{
  new Promise((resolve, reject) => {
    console.log("promise1");
    resolve();
  })
    .then(() => {
      console.log("then1-1");
      new Promise((resolve, reject) => {
        console.log("promise2");
        resolve();
      })
        .then(() => {
          console.log("then2-1");
        })
        .then(() => {
          console.log("then2-2");
        })
        .then(() => {
          console.log("then2-3");
        });
    })
    .then(() => {
      console.log("then1-2");
    });
}
{
  let now = Date.now();
  new Promise(() => {
    setTimeout(() => {
      console.log("promise");
    }, 0);
  });

  while (Date.now() - now < 3000) {}
}

{
  console.log("1");

  setTimeout(function () {
    console.log("2");
    process.nextTick(function () {
      console.log("3");
    });
    new Promise(function (resolve) {
      console.log("4");
      resolve();
    }).then(function () {
      console.log("5");
    });
  });
  process.nextTick(function () {
    console.log("6");
  });
  new Promise(function (resolve) {
    console.log("7");
    resolve();
  }).then(function () {
    console.log("8");
  });

  setTimeout(function () {
    console.log("9");
    process.nextTick(function () {
      console.log("10");
    });
    new Promise(function (resolve) {
      console.log("11");
      resolve();
    }).then(function () {
      console.log("12");
    });
  });
}
