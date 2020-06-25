/*
Exercise 5.3
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
   return array.some(predicate);
}


console.log(everySome([1, 3, 5], n => n < 10));
// → true
console.log(everySome([2, 4, 16], n => n < 10));
// → false
console.log(everySome([], n => n < 10));
// → true