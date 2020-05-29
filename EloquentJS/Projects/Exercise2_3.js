let size = 25, tag = "#", space = " ", chessboard = " ";

//Determines which row you are on
for(let i = 0; i < size; i++){
  //Determines which coloumn your on
    for(let j = 0; j < size; j++){
        if( (i + j)%2 == 0){
            chessboard += tag;
        }
        else{
            chessboard += space;
        }
        
    }
    console.log(chessboard);
    chessboard = " ";
}


