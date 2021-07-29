const EventEmitter = require("events");
const fs = require("fs");

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.offset = this.start;
    this.flowing = false; // pause resume 开关

    this.open(); // 打开文件操作，这个方法是异步的
    // 用户监听了data 事件，才需要读取
    this.on("newListener", (type) => {
      if (type === "data") {
        this.flowing = true;
        this.read();
      }
    });
  }
  destroy(err) {
    if (err) {
      this.emit("error", err);
    }
    if (this.autoClose) {
      fs.close(this.fd, () => {
        this.emit("close");
      });
    }
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.destroy(err);
      }
      this.fd = fd;
      this.emit("open", this.fd);
    });
  }
  read() {
    // 有可能在 "rs.on("data")" 之前得到fd， 例如 rs.on("open") 后面的代码 有一个例如setTimeout的耗时操作
    if (typeof this.fd !== "number") {
      // 在open 之后才能拿到fd
      return this.once("open", (fd) => {
        this.read();
      });
    }

    let howMuchToRead = this.end
      ? Math.min(this.end - this.offset + 1, this.highWaterMark)
      : this.highWaterMark;

    const buffer = Buffer.alloc(howMuchToRead);

    fs.read(
      this.fd,
      buffer,
      0,
      howMuchToRead,
      this.offset,
      (err, bytesRead) => {
        if (err) {
          this.emit("error", err);
          return;
        }
        if (bytesRead) {
          this.offset += bytesRead;
          this.emit("data", buffer.slice(0, bytesRead));
          this.flowing && this.read();
        } else {
          this.emit("end");
          this.destroy();
        }
      }
    );
  }
  pause() {
    this.flowing = false;
  }
  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this.read();
    }
  }
}
module.exports = ReadStream;
