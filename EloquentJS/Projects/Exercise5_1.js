/*
Exercise 5.1: Flattening
*/

let arr = [ [1], [4, 5, 6], [9]];

console.log(arr.reduce((a,b) => a.concat(b)));
