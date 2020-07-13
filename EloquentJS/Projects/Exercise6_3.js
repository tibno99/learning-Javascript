/*
Exercise 6.3: Iterable Groups
*/

class Group{
    constructor(){
        this.values = [];
        this.counter = 0;
    }

    has(index){
        if(this.values.indexOf(index) != -1){return true;}
        return false;
    }

    add(index){
        if(!this.has(index)){this.values.push(index)}
        return this.values;
    }

    delete(index){
        if(this.has(index)){this.values = this.values.filter(n => n != index);}
        return this.values;
    }

    static from(array){
        let tempGroup = new Group();
        for(let index of array){
            tempGroup.add(index);
        }
        return tempGroup;
    }
    //Iterator property needs to return an object
    //This object has a value property (value/undefined) and a done property (bool)
    next(){
        if (this.counter == this.values.length){return {done: true};}

        let value = this.values[this.counter];
        this.counter = this.counter + 1;
        return {value, done: false};
    }

    [Symbol.iterator](){ return this;}
}




for (let value of Group.from(["a", "b", "c"])) {
   console.log(value);
  }

 