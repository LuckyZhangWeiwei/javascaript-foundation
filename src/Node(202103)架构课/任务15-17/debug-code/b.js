const fs = require("fs");
const path = require("path");
const vm = require("vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._cache = {};

Module.prototype.load = function () {
  let ext = path.extname(this.id); // 取后缀名
  Module._extensions[ext](this);
};

Module._extensions = {
  ".js"(module) {
    let script = fs.readFileSync(module.id, "utf8");
    let templateFn = `(function(exports, module, require,  __dirname, __filename){${script}})`;

    let fn = vm.runInThisContext(templateFn);
    // console.log("fn:", fn.toString());
    let exports = module.exports;
    let thisValue = exports; // this = module.exports = exports
    let filename = module.id;
    let dirname = path.dirname(filename);
    fn.call(thisValue, exports, module, req, dirname, filename); // call 会让 a.js 文件中的this 指向 thisValue
  },
  ".json"(module) {
    let script = fs.readFileSync(module.id, "utf8");
    module.exports = JSON.parse(script);
  },
};

Module._resolveFileName = function (id) {
  let filePath = path.resolve(__dirname, id); // 获取绝对路径
  let exists = fs.existsSync(filePath);
  if (exists) return filePath;
  // 否则 尝试添加后缀
  let keys = Reflect.ownKeys(Module._extensions);
  for (let i = 0; i < keys.length; i++) {
    let newPath = filePath + keys[i];
    if (fs.existsSync(newPath)) {
      return newPath;
    }
  }
  throw new Error("module not found");
};

function req(fileName) {
  fileName = Module._resolveFileName(fileName); // 获取绝对路径
  if (Module._cache[fileName]) {
    return Module._cache[fileName].exports;
  }
  const module = new Module(fileName); // 根据路径创建一个模块
  Module._cache[fileName] = module; // 缓存模块
  module.load(); // 让用户给module.exports 赋值
  return module.exports; // 默认是空对象
}

/************************************************* */
let a = req("./a.js");
a = req("./a.js");
a = req("./a.js");
console.log(a);
