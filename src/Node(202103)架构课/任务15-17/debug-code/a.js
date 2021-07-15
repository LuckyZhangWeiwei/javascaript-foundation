let a = 100;
console.log("a exec");
console.log("is Equal:", this === module.exports);
module.exports = a;
