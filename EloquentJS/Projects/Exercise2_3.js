let size = 2, tag = "#", space = " ", even = "#", odd = " ";

//Determines which row you are on
for(let i = 0; i < size; i++){
    //For every even row (0,2,4, etc...)
    if(i%2 == 0){
        for(let i = 0; i < size - 1; i++){
            if(i%2 == 0){
                even = even + space;
            }
            else{
                even = even + tag;
            }
        }
        console.log(even);
        even = "#";
    }
    //else it's odd
    else{
        for(let i = 0; i < size - 1; i++){
            if(i%2 == 0){
                odd = odd + tag;
            }
            else{
                odd = odd + space;
            }
         }
        console.log(odd);
        odd = " ";
     }
}

