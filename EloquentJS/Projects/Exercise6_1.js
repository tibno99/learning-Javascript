/*
Exercise 6.1: "A Vector Type"
*/

class Vec{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    
    plus(vector){
        this.x += vector.x ;
        this.y += vector.y;
        return this;
    }

    minus(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    get length(){
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);
