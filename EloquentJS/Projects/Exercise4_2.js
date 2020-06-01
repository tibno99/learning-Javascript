/*Exercise 4.2: "Reversing an array"
*/

function reverseArray(array){
    let reversedArray = [];
    for(let index of array){
        reversedArray.unshift(index);
    }
return reversedArray;
}



function reverseArrayInPlace(array){
    for(let i = 0; i < array.length / 2; i++){
       let x = array[i];
       array[i] = array [array.length - 1 - i];
       array[array.length - 1 - i] = x;
    }
    return array;    
}

console.log(reverseArrayInPlace([2, 3, 4, 5]));
