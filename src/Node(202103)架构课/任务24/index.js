{
  const fs = require("fs");
  const path = require("path");
  // fs.readFile(path.resolve(__dirname, "package.json"), function (err, data) {
  //   console.log(err);
  // });

  // 如果采用下面这种嵌套的方法，就只能读完之后，才可以写入
  // 大文件可能导致淹没可用内存
  // 此方式适合小文件
  fs.readFile("./package.json", function (err, data) {
    if (err) console.log(err);
    fs.writeFile(
      path.resolve(__dirname, "./test.js"),
      data,
      function (err, data) {
        console.log("data:", data);
      }
    );
  });
}
{
  let buf = Buffer.alloc(3);
  const fs = require("fs");
  const path = require("path");
  fs.open(path.resolve(__dirname, "a.txt"), "r", function (err, fd) {
    // 读取a.txt 将读取到的内容写入到buffer的第0个位置写3个，从文件的第6个位置开始写入
    fs.read(fd, buf, 0, 3, 6, function (error, bytesRead) {
      console.log(buf); // 输出的ASCII
      fs.open(path.resolve(__dirname, "b.txt"), "w", function (err, wfd) {
        // 将buffer的数据从0 开始读取3个 写入到文件的第0个位置
        fs.write(wfd, buf, 0, 3, 0, function (err, written) {
          console.log(written);
          // 内部要递归
        });
      });
    });
  });
}
