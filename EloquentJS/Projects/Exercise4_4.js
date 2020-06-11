/* 
Exercise 4.4: Deep Equal
*/
//////////////////////////////////////////////////
function deepEqual(obj1, obj2){
    if (typeof(obj1) != typeof(obj2)){return false;}

    else if (typeof(obj1) == "object"){
        if(obj1 == null && obj2 == null){return true;}
        let array1 = Object.keys(obj1), array2 = Object.keys(obj2);
        if (array1.length != array2.length){return false;}
        for(let i of array1){
            if(! deepEqual(obj1[i], obj2[i])){return false;}
        }
    }

    else if (obj1 != obj2){return false;}
        
    return true;
}


///////////////////////////////////////////////////

let x = {Dog: "Mavy",
            Dad: "Smelly",
            Arms: 2
        };

let y = {Dog: "Mavy",
            Dad: "Smelly",
            Arms: 2
};


console.log(deepEqual(x,y));
