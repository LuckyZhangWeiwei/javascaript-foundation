// 递归调用， 不能中断，中断后无法恢复
// 不能中断 执行栈太深

let root = {
  key: "A1",
  children: [
    {
      key: "B1",
      children: [
        { key: "C1", children: [] },
        { key: "C2", children: [] },
      ],
    },
    {
      key: "B2",
      children: [],
    },
  ],
};
// 深度遍历
function walk(vDom) {
  doWork(vDom);
  vDom.children.forEach((child) => {
    walk(child);
  });
}
function doWork(vDom) {
  console.log(vDom.key);
}
walk(root);
