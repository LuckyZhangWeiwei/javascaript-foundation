// ejs new Function + with 实现
// const ejs = require("ejs");

const fs = require("fs");
const util = require("util");
const read = util.promisify(fs.readFile);

let ejs = {
  async renderFile(fileName, options) {
    let content = await read(fileName, "utf8");

    let head = ``;
    let body = ``;
    let tail = ``;
    return head + body + tail;
    // content = content.replace(/<%=(.+?)%>/g, function () {
    //   return options[arguments[1]];
    // });
    // return content;
  },
};
(async function () {
  let result = await ejs.renderFile(
    "./src/Node(202103)架构课/任务20/template.html",
    {
      name: "zhufeng",
      age: 12,
    }
  );
  console.log(result);
})();
