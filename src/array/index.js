// 1. push
// 2.unshift
{
  let arr = [10, 20];
  let res = arr.unshift(30, "aa");
  console.log(res, arr);
}
//3. 创建一个新的数组，克隆
{
  let arr = [10, 20];
  arr = [100, ...arr];
  console.log(arr);
}

// 4. shift 删除第一项, 返回删除的那一个项
{
  let arr = [1, 2, 3];
  console.log(arr.shift(), arr);
}
// 5. delete, 但是会留空，不会影响本身arr的长度
{
  let arr = [1, 2, 3];
  delete arr[0];
  console.log(arr);
}

// 6. pop 返回最后一项
{
  let arr = [1, 2, 3];
  let res = arr.pop();
  console.log(res, arr);
}

// 7. 原生方式删除最后一项
{
  let arr = [1, 2, 3];
  arr.length--;
  console.log(arr);
}

// 8. splice 剪接 增删改 原数组变化
{
  let arr = [1, 2, 3];
  // delete 从索引n 开始（包含） 删除m个元素，（忽略第一个参数 ，则删除到最后）
  // 把删除的部分用新的数组存起来返回
  // let res = arr.splice(1, 1);
  // console.log(res, arr);
  // update m n x 从索引n开始删除m个元素，用x占用删除的部分
  // res = arr.splice(1, 2, "zhu","feng")
  // console.log(res, arr)
  // insert m 0 x 从索引n开始一个元素都不删除，把x放到索引m的前面
  res = arr.splice(1, 0, "added");
  console.log(res, arr);
  // 尾部追加
  arr.splice(arr.length, 0, "aaa");
  // 头部追加
  arr.splice(0, 0, "bbb");
}
/***********************数组查询拼接 */
// slice 原数组不变
// 实现数组查询 从索引n 找到索引m 但是不包含m的地方
// params n, m
// return 以新的数组返回， 原数组不变
{
  let arr = [1, 2, 3, 4, 5, 6];
  //   let res = arr.slice(1,3)
  //   console.log(res, arr)

  //   res = arr.slice(1)
  //   console.log(res, arr)

  //   res = arr.slice(0) // 等于数组克隆
  //   console.log(res, arr)

  //   res = arr.slice() // 等于数组克隆
  //   console.log(res, arr)

  // let res = arr.slice(-1, -2)
  // console.log(res, arr)

  // res =arr.slice(2,1)
  // console.log(res, arr)

  res = arr.slice(2.8, 3);
  console.log(res, arr);
}

//concat 数组拼接
// params 多个任意值
// return 拼接后的新数组（原数组不变）
{
  let ary1 = [1, 2, 3];
  let ary2 = [4, 5, 6];
  // let res = ary1.concat("p")
  // console.log(res, ary1)

  // let res = ary1.concat() // 数组的克隆
  // console.log(res, ary1, res === ary1)

  let res = ary1.concat("p", ary2);
  console.log(res, ary1);
}

//toString, 把数组转化为字符串 原数组不变
// params
// return 转化后的字符串（原数组不变）
{
  let ary = [1, 2, 3];
  let res = ary.toString();
  console.log(res, [1, 2, 3].join("|"));

  console.log({}.toString.call(ary));
  console.log(eval([1, 2, 3].join("+")));
}
/***************检测数组中是否包含某项**************************/
// indexof / lastIndexOf 检测当前项在数组中第一次或者最后一次出现的位置
// params 要检索的这一项内容
// return 这一项出现的位置索引（数字）， 如果没有这一项，则返回-1
// comment: 原数组不变，在ie6-8 不兼容
{
  let ary = [1, 2, 3, 1, 2, 3];
  console.log(ary.indexOf(2), ary.lastIndexOf(2));
  console.log(ary.includes(2)); // es6
}
/***************数组排序排列******************************************/
// reverse 把数组倒过来 (注意不是从小到大)
// param
// return 排列后的新数组   原数组改变
{
  let ary = [1, 2, 3, 1, 2, 3];
  console.log(ary.reverse(), ary);
  console.log(ary.reverse() === ary);
}
// sort
// param 可有可无
// return 排序后的新数组， 原数组改变
{
  let ary = [1, 2, 3, 1, 2, 3];
  let res = ary.sort();
  console.log(ary, res, ary === res);
  console.log("------------------------");
  ary = [12, 15, 9, 28, 10, 22]; // 按照第一个字符排序， sort 方法如果不传参，无法处理10 以上的数字排序的
  // res = ary.sort();
  // console.log(ary);
  console.log("--------------------------");
  ary.sort((a, b) => {
    console.log(a, b);
    return a - b;
  });
  console.log(ary);
}
/************遍历数组**************************/
// foreach 遍历数组中的每一项
// params 回调函数
// return 原来的数组不变
{
  let ary = [1, 2, 3, 1, 2, 3];
  ary.forEach((item, index) => {
    // item 为当前项 index 为当前项的索引
    console.log(item, index);
  });
}
