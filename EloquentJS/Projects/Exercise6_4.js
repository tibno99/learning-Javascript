/* 
Exercise 6.4: Borrowing a Method
*/

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true