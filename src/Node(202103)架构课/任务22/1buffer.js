const { Console } = require("console");

{
  /*
  一个字节有8个位组成的
  1024 个字节 是 1 k
  二进制 逢二进一
  其他进制如何转化为十进制， 当前位的值 * 进制 ^ 当前所在位， 把每一位进行相加
  */
  console.log(0.1 + 0.2);
  console.log(0.1 + 0.2 === 0.3);
}
{
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += Math.pow(2, i);
  }
  console.log(sum);
  // 一个字节 由8个位组成， 范围 0 - 255 ， 2^8 - 1
  // 将一个10进制 转化为2进制， 取 2 的余数， 倒着读
}
{
  // 二进制转化为十进制
  console.log(parseInt("101", 2));
  // (0x64) 为16进制， 单纯的64 为十进制, 0b 为二进制， 0x为十六进制
  // 16 进制 转10进制
  console.log((0x64).toString());
  // 16进制转2进制
  console.log((0x64).toString(2));
  // 10 进制转化为2进制
  console.log((64).toString(2));
}
{
  // 10进制的0.5 是2进制的多少？
  // 10 -> 0.5
  // 2 -> X?   x = 0.1
  // 所以10进制的0.5 就是2进制的0.1 （乘以2 取余）转化为2进制 <- 将一个小数 转化为2进制
  /*
  0.1 转化 2进制
  0.1 * 2 = 0.2 0
  0.2 * 2 = 0.4 0
  0.4 * 2 = 0.8 0
  0.8 * 2 = 1.6 1
  0.6 * 2 = 1.2 1
  ...
  如果想存储，是存不净的， 0.1 转为为2 进制是一个无穷尽的小数
  */
  console.log(0.1 + 0.2); // 0.1 和 0.2 都会比实际大一点
  console.log(0.2 + 0.2); // 没有问题
  // js没有把小数转化为2进制的方法的
  // 在服务器，我们需要一个东西可以来标识内存，但是不能是字符串，因为字符串无法标识图片
  // node 中用buffer 类标识内存中的数据， 把内容转化为16进制显示（因为16进制短）
  // 10进制 255 11111111 （2进制） 0xff 16进制， 所以buffer 的取值范围 0 - 0xff
  // node 中buffer 可以和字符串相互转化（可能会出现乱码）
  // 编码规范 ASCII -> GBK -> unicode -> utf8
  // nodejs buffer 编码全部统一为utf8 不支持其他编码
  // buffer 代表的是内存，内存是一段固定的空间， 产生的内存是固定的大小，不能随意添加
  // 扩容的概念 要动态创建一个新的内容，把内容迁移过去
  // npm install @types/node 可以支持node提示
  const buffer = Buffer.alloc(5);
  console.log(buffer); // 像数组但是和数组有区别，数组可以扩展，buffer不可以扩展，可以用索引取值
  console.log(buffer[0]); // 十进制

  const buffer2 = Buffer.from([0x25, 0x26, 0x27]); // 超过255 会取余数
  console.log(buffer2);

  const buffer3 = Buffer.from("珠峰"); // 6个字节
  console.log(buffer3);
  // base64 可以转化为字符串放到任何路径链接中（可以减少请求的发送） 文件大小会变大， base64 转化后会比原生大三分之一
  const r = Buffer.from("珠").toString("base64");
  // base64 的来源就是将每个字节都转化为小于64 的值
  console.log(r);
}
{
  const buffer = Buffer.from([1, 2, 3, 4, 5]); // 内部存储的是引用地址
  let sliceBuffer = buffer.slice(0, 1); // 在原buffer上操作，js是copy一份(浅copy)
  sliceBuffer[0] = 100;
  console.log(buffer);

  let arr = [[1], 2, 3, 4];
  let newArr = arr.slice(0, 1);
  console.log(arr[0] === newArr);
  newArr[0][0] = 100;
  console.log(arr);
}
{
  // copy
  let buf0 = Buffer.from("架构");
  let buf1 = Buffer.from("珠");
  let buf2 = Buffer.from("峰");
  // 4个汉字12个字节
  let bigBuffer = Buffer.alloc(12);
  // parameter
  // 1. 目标buffer
  // 2. 从目标buffer 的第几位开始
  // 3. 从被copy的第几位开始
  // 4. 到被copy的第几位结束
  buf0.copy(bigBuffer, 6, 0, 6);
  buf1.copy(bigBuffer, 0, 0, 3);
  buf2.copy(bigBuffer, 3, 0, 3);
  console.log(bigBuffer.toString());
}
{
  // copy 自己实现
  Buffer.prototype.copy = function (
    targetBuffer,
    targetStart,
    sourceStart = 0,
    sourceEnd = this.length
  ) {
    for (let i = sourceStart; i < sourceEnd; i++) {
      targetBuffer[targetStart++] = this[i];
    }
  };
  let buf0 = Buffer.from("架构");
  let buf1 = Buffer.from("珠");
  let buf2 = Buffer.from("峰");
  let bigBuffer = Buffer.alloc(12);
  buf0.copy(bigBuffer, 6, 0, 6);
  buf1.copy(bigBuffer, 0, 0, 3);
  buf2.copy(bigBuffer, 3, 0, 3);
  console.log(bigBuffer.toString());
}
{
  // concat 基于copy
  let buf0 = Buffer.from("架构");
  let buf1 = Buffer.from("珠");
  let buf2 = Buffer.from("峰");
  console.log(Buffer.concat([buf0, buf1, buf2]).toString());
}
{
  // 实现concat
  Buffer.concat = function (
    bufferList,
    length = bufferList.reduce((a, b) => a + b.length, 0)
  ) {
    let bigBuffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach((buffer) => {
      buffer.copy(bigBuffer, offset);
      offset += buffer.length;
    });
    return bigBuffer;
  };
  let buf0 = Buffer.from("架构");
  let buf1 = Buffer.from("珠");
  let buf2 = Buffer.from("峰");
  let bigBuffer = Buffer.concat([buf0, buf1, buf2]);
  console.log(bigBuffer.toString());
  // 字节长度
  console.log(bigBuffer.byteLength, bigBuffer.length);
  console.log(Buffer.isBuffer(bigBuffer));
}
