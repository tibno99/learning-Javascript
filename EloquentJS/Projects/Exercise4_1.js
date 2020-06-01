/*
Exercise 4.1: The sum of ranges
This exercise assumes that start and end are in the correct order
*/

function range(start, end, step = 1){
    let arr = [];
    for (let i = start; i != end + step; i += step){
        arr.push(i);
    }
    return arr;
}

function sum(array){
    let total = 0;
    for(let i of array){
        total += i;
    }
    return total;
}

console.log(range(45, 100, 5));
console.log(sum(range(45, 100, 5)));