/*
Exercise 4.3: List
*/

function listToArray(list){
    let {value, rest} = list;

    if (rest = null){ 
    return array;
    }
    else{
    listToArray(rest);
    }
    
}


let list = { value: 1,
             rest: {
                    value: 2,
                    rest: {
                           value: 3,
                           rest: null
                        }
                }
          }



let {value, rest} = list.rest.rest;



console.log(value, rest);