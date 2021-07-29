// 可读流， 不是一下子把文件都读取完，而是可以控制读取的个数和速率
const path = require("path");
const fs = require("fs"); // fs 基于stream 模块底层扩展了一个文件读写方法，fs本身和流无关
const ReadStream = require(path.resolve(__dirname, "./../3/ReadStream"));
let rs = new ReadStream(path.resolve(__dirname, "./../a.txt"), {
  // let rs = fs.createReadStream(path.resolve(__dirname, "./../a.txt"), {
  flags: "r", // 一般不是传入此参数
  encoding: null, // buffer
  autoClose: true, // 相当于要close
  emitClose: true, // 触发一个close 事件
  start: 0,
  // end: 4,
  highWaterMark: 3, // 每次读取的数据个数 默认是 64 * 1024 字节
});

rs.on("open", function (fd) {
  console.log("open:", fd);
});

// 监听用户绑定的data事件，触发回调，不停的触发
// 有非流动 变为 流动
rs.on("data", function (chunk) {
  console.log(chunk.toString()); // 输出为ASCII ， 16进制
  rs.pause(); // 暂停
});

rs.on("end", function () {
  console.log("end");
});

rs.on("close", function () {
  console.log("close");
});

setInterval(() => {
  rs.resume(); // 恢复， 再次触发data事件
}, 100);
