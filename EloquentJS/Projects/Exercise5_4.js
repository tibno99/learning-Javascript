/*
Exercise 5.4 "Dominant Writing Direction"
*/
var SCRIPTS = require('./scripts.js');

//From the Eloquent Textbook
function characterScript(code){
    for(let script of SCRIPTS){
        if(script.ranges.some(([from, to]) => {return code >= from && code < to;})){
            return script;
        }
    }
    return null;
}

function countBy(items, groupName){
    let counts = [];
    for(let item of items){
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1){
            counts.push({name, count: 1});
        }
        else{
            counts[known].count++;
        }
    }
    return counts;
}

//Original Code here

function greatest(array){
    let init = 0, name = '';
    for(let element of array){
        name = (element.count > init) ? element.name : null;    
    }

    return name
}

function dominantDirection(phrase){

    let script = countBy(phrase, index => {
        let script = characterScript(index.codePointAt(0));
        return script? script.direction : "none";
    }).filter(({name}) => name != "none");

    return greatest(script);
}



console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl