//Exercise 3.3 "Bean Counting"
let countBs = function(word){
    let i = 0, count = 0;
    while( i < word.length ){
        if(word[i] == "B" ){
            count += 1;
        }
    i++;
    }
return count;
}

//Making it available for any character
let countChars = function(word2, letter){
    let i = 0, count = 0;
    while( i < word2.length ){
        if(word2[i] == letter ){
            count += 1;
        }
    i++;
    }
return count;
}


console.log(countChars("juicy moosy", "y"));