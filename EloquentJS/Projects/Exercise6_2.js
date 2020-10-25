/*
Exercise 6.2: Group
*/

class Group{
    constructor(array){
        this.values = array;
    }

    add(addition){
        if(this.values.indexOf(addition) == -1){
            this.values.push(addition);
            return this.values;
        }
        else{
            return 'Already a member';
        }
    }

    delete(deletion){
        if(this.values.indexOf(deletion) == -1){
            return 'Not an existing member'
        }
        else{
           this.values =  this.values.filter(n => n != deletion);
            return this.values;
        }
    }

    has(hasation){
        if(this.values.indexOf(hasation) != -1){return true;}
        return false;
    }

    static from(array){
        let arr = []
        for(let i = array[0]; i <= array[1]; i++){ arr.push(i); }
        return new Group(arr);
    }
}


//////////////////////////////////////////////////////////////////////
//Redoing with references within the class
//////////////////////////////////////////////////////////////////////
class GroupRef{
    constructor(){
        this.values = [];
    }

    has(value){
        if(this.values.indexOf(value) != -1){ return true;}
        return false;
    }

    add(value){
        if(!this.has(value)){this.values.push(value);}
        return this.values;
    }

    delete(value){
        if(this.has(value)){this.values = this.values.filter(i => i != value)}
        return this.values;
    }

    static from(array){
        let newgroup = new GroupRef();
        for( let i = array[0]; i < array[1]; i++){
            newgroup.add(i);
        }
        return newgroup;
    }

}
let group = GroupRef.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));