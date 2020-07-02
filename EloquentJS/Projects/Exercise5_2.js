/* 
Exercise 5.1: Your Own Loop
*/

function loop(val, test, update, body){
     while(test(val)){
        body(val);
        val = update(val)
     }
return;
}

loop(3, n => n > 0, n => n - 1, console.log);