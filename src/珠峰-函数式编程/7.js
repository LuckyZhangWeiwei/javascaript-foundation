// -> CLICK_BUTTON
let { join, toUpper, split, flowRight } = require("lodash/fp");
let str = "click button";

let r1 = split(" ", str);
console.log(r1);

// let composed = flowRight(join("_"), split("_"), toUpper, split(" "));
// let r1 = composed(str);
// console.log(r1);
