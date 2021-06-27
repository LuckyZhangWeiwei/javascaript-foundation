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
