// this 为当前模块的导出对象
console.log(module.exports === exports, this === module.exports);
/*********************************************************************/
module.exports = "hello"; // 可以 更改module.exports 优先级最高， 因为最终将会将module.exports 直接导出
/**
 *  function() {
 *    let exports = module.exports = {};
 *    exports = "hello"
 *    return module.exports
 *  }
 *  只是改变了exports 的引用地址，但是 module.exports 的引用地址 没有改变
 *  所以不能采用 exports = "hello"; 的方式导出
 *  可以使用 module.exports = "hello" 的方式导出
 */
/*********************************************************************/
exports = "hello"; // 不可以
/*********************************************************************/
exports.a = "hello"; // 可以
exports.b = "hello"; // 可以
/*********************************************************************/
this.a = "hello"; // 可以
this.b = "hello"; // 可以
// require 不支持  同时都导出和部分导出
