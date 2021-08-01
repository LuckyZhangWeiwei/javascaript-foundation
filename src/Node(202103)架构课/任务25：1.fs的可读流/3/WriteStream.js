const fs = require("fs");

let ws = fs.createWriteStream(
  "./src/Node(202103)架构课/任务25：1.fs的可读流/3/b.txt",
  {
    flags: "w",
    encoding: "utf-8",
    autoClose: true,
    start: 0,
    highWaterMark: 3, // 与可读流的highWaterMark 不一样，期待用多少内存来写入
  }
);

ws.on("close", function () {
  console.log("close");
});

let flag = ws.write("1"); // string or buffer
console.log(flag); // 期望用3（highWaterMark） 个字节写入，但实际上 是累加后大于等于3， 比3 多， 所以为false， 虽然超过了预期（false），但仍然可以写入
let flag2 = ws.write("2");
console.log(flag2);
let flag3 = ws.write("3");
console.log(flag3);
let flag4 = ws.write("4");
console.log(flag4);
ws.end(); // write + close

// 由于write方法是异步操作，所以如果多个write方法同时操作一个文件，就会出现错误
// 除了第一次的write写入文件，其他write操作插入队列，第一个完成后，清空缓存区
// 如果缓存区过大会导致浪费内存，所以会设置一个预期值进行控制，达到预期值后就不要进行write 操作
{
  const fs = require("fs");
  const rs = fs.createReadStream(
    "./src/Node(202103)架构课/任务25：1.fs的可读流/b.txt",
    {
      highWaterMark: 3, // 每次读取3个字节， 默认64k
    }
  );
  const ws = fs.createWriteStream(
    "./src/Node(202103)架构课/任务25：1.fs的可读流/3/b.txt",
    {
      highWaterMark: 4, // 默认16k
    }
  );

  rs.on("data", function (data) {
    console.log(data.toString());
    let flag = ws.write(data);
    console.log(flag);
    if (!flag) {
      // 避免往stack 中写入，浪费内存
      console.log("吃不下了");
      rs.pause();
    }
  });

  // 排空
  ws.on("drain", function () {
    console.log("吃完了，再喂我吧");
    rs.resume();
  });
}
