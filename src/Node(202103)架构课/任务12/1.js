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
