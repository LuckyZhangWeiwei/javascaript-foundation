// node 中的模块 es6 module commonjs 两种规范
// 用webpack 打包后 es6 module -> commonjs（这时已经做了tree shaking）
// es6 静态模块， 可以做tree shaking， 因为可以在编译阶段做代码分析， tree shaking 只能在编译阶段做！
// commonjs 动态模块 （在代码执行中可以引入模块, 不可以做tree shaking）在代码运行时才可以确定哪些代码被用到

// 核心模块
{
  // require 内部就是用readFileSync 实现的，所以require 为同步
  const fs = require("fs");
  let r = fs.readFileSync("./src/Node(202103)架构课/任务15/index.js", "utf8");
  fs.existsSync();
}
{
  const path = require("path");
  console.log(path.resolve()); // 编译器运行的目录
  console.log(path.resolve(__dirname)); // 执行的文件所在的目录， 绝对路径
  console.log(path.resolve(__dirname, "/")); // 加入“/” 会回到根路径
  console.log(path.join("a", "b", "/")); // 拼接 是相对路径，不是绝对路径， 遇到“/”也会拼到一起
  console.log(path.extname("index.js")); // 扩展名
  console.log(path.basename("index.js", ".js")); // 获取文件名
  console.log(path.relative("./src/Node(202103)架构课/任务15/index.js", "./")); // 根据路径获取相对路径
  console.log(path.dirname("./src/Node(202103)架构课/任务15")); // 获取当前文件的父目录名， __dirname 的实现 就是 path.dirname()
}

{
  // 字符串如果变成js来执行, 但是缺点时 如果传入参数， 会用到全局作用域， 污染环境
  global.arg1 = "good";
  global.arg2 = "luck";

  new Function("arg1", "arg2", "console.log(arg1, arg2)")(arg1, arg2);

  const vm = require("vm");
  // 在node中全局变量实在多个模块中共享的， 所以不要通过global 定义属性
  vm.runInThisContext("console.log(arg1)");
  // 由于开辟一个新的上下文，所以不能访问arg1
  vm.runInNewContext("console.log(arg1)");
  // require 实现
  // 1. 读取文件
  // 2. 读到后给文件包装一个函数
  // 3. 通过 runInThisContext将其变为js语法
  // 4. 调用
}
{
  const vm = require("vm");

  globalName = "global";

  var localName = "local";

  function code(prefix) {
    return `console.log("${prefix}:", typeof globalName, typeof localName)`;
  }

  // eval(code("eval"));
  // new Function(code("function"))();
  // vm.runInThisContext(code("vm, this ctx"));
  vm.runInNewContext(code("vm, new ctx"));
}
