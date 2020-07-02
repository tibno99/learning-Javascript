/*
Exercise 5.3 "Everything"
*/


function everyLoop(array, predicate){
    for(let index of array){
        if(!predicate(index)){
            return false;
        }
    }
return true;
}

function everySome(array, predicate){
    return !array.some(index => !predicate(index));
}


console.log(everySome([1, 3, 5], n => n < 10));
// → true
console.log(everySome([2, 4, 16], n => n < 10));
// → false
console.log(everySome([], n => n < 10));
// → true

