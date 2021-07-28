{
  // 使用3个字节来实现一个copy 功能
  const fs = require("fs");
  const path = require("path");
  function copy(source, target, cb) {
    const BUFFER_SIZE = 3;
    const buffer = Buffer.alloc(BUFFER_SIZE);
    // 读取文件的偏移量
    let r_offset = 0;
    // 写入文件的偏移量
    let w_offset = 0;
    // 读取文件必须存在，否则会报异常，读取处理的结果都是buffer 类型
    // 写入文件的时候，文件不存在会创建，如果文件有内容会被清空
    fs.open(source, "r", function (err, rfd) {
      fs.open(target, "w", function (err, wfd) {
        // 回调的方式实现功能， 需要用递归
        // 同步代码 可以用while
        function next() {
          fs.read(
            rfd,
            buffer,
            0,
            BUFFER_SIZE,
            r_offset,
            function (err, bytesRead) {
              //bytesRead 真正读取到的个数
              if (err) return cb(err);
              if (bytesRead) {
                fs.write(
                  wfd,
                  buffer,
                  0, // 从开辟的内存的第0个进行操作
                  bytesRead,
                  w_offset,
                  function (err, written) {
                    // written 真实写入的个数
                    r_offset += bytesRead;
                    w_offset += written;
                    next();
                  }
                );
              } else {
                // 读取完毕
                fs.close(rfd, () => {});
                fs.close(wfd, () => {});
                cb();
              }
            }
          );
        }
        next();
      });
    });
  }
  copy(
    path.resolve(__dirname, "a.txt"),
    path.resolve(__dirname, "b.txt"),
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("successful");
      }
    }
  );
}
