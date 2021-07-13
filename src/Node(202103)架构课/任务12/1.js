{
  console.log(this); // {}
}
{
  (function () {
    console.log(this); // global
  })();
}
{
  // __dirname 当前执行的文件的目录(绝对路径)
  // __filename 当前执行的文件(绝对路径)

  console.log(__dirname);
  console.log(__filename);
}
{
  // process
  // platform
  // chdir
  // cwd - current working directory 可以改变
  // env
  // argv 执行代码时传入的参数
  // nextTick

  // console.log(process);
  // process.chdir("./Node(202103)架构课/");
  // console.log(process.cwd());
  // console.log(process.env);
  // if (process.env.NODE_ENV === "development") {
  //   console.log("development");
  // } else {
  //   console.log("production");
  // }
  // [执行node所在的exe文件， 当前的执行文件， ...其他参数]
  console.log(process.argv);
  let obj = process.argv.slice(2).reduce((memo, current, index, arr) => {
    if (current.startsWith("--")) {
      memo[current.slice(2)] = arr[index + 1];
    }
    return memo;
  }, {});
  console.log("obj:", obj);
}
{
  // commander
  const { program } = require("commander");
  program.option("-p --port <n>", "set user port");
  program.option("-f --file <n>", "set user directory");
  program
    .command("create")
    .description("createProject")
    .action(() => {
      console.log("创建项目");
    });
  program.parse(process.argv);
  const options = program.opts();
  console.log(options);
}
{
  // ------------------- next tick -----------------------
  Promise.resolve().then(() => {
    console.log("Promise");
  });

  // 当前执行栈的底部，当执行栈的代码执行完后，马上执行
  process.nextTick(() => {
    console.log("nextTick");
  });
}
{
  // 下面俩个谁先执行，不一定
  // 当前默认执行主栈代码， 主栈代码执行完毕后在执行定时器， 但是定时器可能没有到达执行时间
  setTimeout(() => {
    let i = 0;
    while (i < 1000000) {
      i++;
    }
    console.log("setTimeout");
  }, 0);
  setImmediate(() => {
    console.log("setImmediate");
  });
}
{
  // 在poll阶段， poll执行后会检测check 队列是否有任务
  const fs = require("fs");
  fs.readFile("./捕获.PNG", "utf8", () => {
    console.log("aaaaaaaaa");
    setTimeout(() => {
      console.log("setTimeout");
    }, 0);
    // 异步方法
    setImmediate(() => {
      console.log("setImmediate");
    });
  });
}

{
  // 此时就阻塞到poll阶段， check 阶段有任务， 则先执行 check 阶段的任务， 在从timer 阶段 进行循环
  // 如果poll 队列为空，则阻塞在poll， 当setTimeout 到时间时，走到timer中，继续循环
  const fs = require("fs");
  fs.readFile("./1.js", "utf8", (err, data) => {
    console.log("data:", data);
  });
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  setImmediate(() => {
    console.log("setImmediate");
  });
  Promise.resolve().then(() => {
    console.log("then");
  });
  Promise.resolve().then(() => {
    console.log("then2");
  });
}

{
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  setTimeout(() => {
    console.log("setTimeout2");
    Promise.resolve().then(() => {
      console.log("then");
    });
  }, 0);
}
{
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  Promise.resolve().then(() => {
    console.log("then");
  });
  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);
}
{
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);

  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);
  Promise.resolve().then(() => {
    let i = 0;
    while (i < 100000) {
      i++;
    }
    console.log("then");
  });
  Promise.resolve().then(() => {
    console.log("then2");
  });
}
{
  // exports require module __filename __dirname
  // 每个文件作为一个模块，其实是把文件的内容用function 包裹，上面的五个就是函数的参数
  console.log(module);
  // commonjs 中的require 是 同步的 读取文件， esm import 是异步的（如果不用webpack）
}
