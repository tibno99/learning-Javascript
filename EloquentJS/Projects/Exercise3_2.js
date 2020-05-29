//Exercise 3.2 "Recursion"
let isEven = function(N){
    if( N == 0){
        return true;
    }
    else if( N == 1){
        return false;
    }
    else if(N < 0){
        return isEven( N * -1 );
    }
    else{
        return isEven( N - 2);
    }
}

console.log(isEven(-69));