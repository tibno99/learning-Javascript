/*
Project 1: A Robot
*/
//A list containing the road connections in the village
const roads = [
    "Alice's House-Bob's House",     "Alice's House-Cabin",
    "Alice's House-Post Office",     "Bob's House-Town Hall",
    "Daria's House-Ernie's House",   "Daria's House-Town Hall",
    "Ernie's House-Grete's House",   "Grete's House-Farm",
    "Grete's House-Shop",            "Marketplace-Farm",
    "Marketplace-Post Office",       "Marketplace-Shop",
    "Marketplace-Town Hall",         "Shop-Town Hall"
  ];
//Builds the village graph from the roads constant
 function buildGraph(edges){
    let graph = Object.create(null);
    function addEdge(from, to){
        if (graph[from] == null){
            graph[from] = [to];
        }
        else{
           graph[from].push(to); 
        }
    }
    for(let [from, to] of edges.map(n => n.split("-"))){
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
 }

 const roadGraph = buildGraph(roads);

//We classify the village into states
class VillageState{
    constructor(place, parcels){
        this.place = place;
        this.parcels = parcels;
    }
    
    move(destination){
        //Checks to see if the destination requested is a valid move
        if(!roadGraph[this.place].includes(destination)){
            return this;
        }
        //
        else{
            let parcels = this.parcels.map(n => {
                if (n.place != this.place) return n;
                return {place: destination, address: n.address}
            }).filter(n => n.place != n.address)
        return new VillageState(destination, parcels);
        }
    }
}

 
function runRobot(state, robot, memory){
    for(let turn = 0;;turn++){
        if(state.parcels.length == 0){
            //edit line below
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
       //removed console line;
       console.log(`Moved to ${action.direction}`);

    }
}

//Random array picker function
function randomPick(array){
    let choice = Math.floor(Math.random()*array.length);
    return array[choice]
}
//Robot that uses the random array picker function to decide where to go
function randomRobot(state){
    return {direction: randomPick(roadGraph[state.place])};
}

//This randomly creates a graph with distributed parcels
VillageState.random = function(parcelCount = 5){
    let parcels = [];
    for(let i = 0; i < parcelCount; i++){
        let address = randomPick(Object.keys(roadGraph));
        let place; 
        do{ 
            place = randomPick(Object.keys(roadGraph));
        }while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
}

//This is the memory for the route robot
const mailRoute = [ "Alice's House", "Cabin", "Alice's House", "Bob's House",
"Town Hall", "Daria's House", "Ernie's House",
"Grete's House", "Shop", "Grete's House", "Farm",
"Marketplace", "Post Office"
];

//this route Robot uses memory (defined above) to go around the village delivering based off whats next on the list
function routeRobot(state, memory){
    if(memory.length == 0){
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

//This function finds the shortest route between A => B
function findRoute(graph, from, to){
    let work = [{at: from, route: []}];
    for(let i = 0; i <work.length; i++){
        let {at, route} = work[i];
        for (let place of graph[at]){
            if(place == to) return route.concat(place);
            if(!work.some(w => w.at == place)){
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}

//This robot uses a web to try to go to the goal the fastest
function goalOrientedRobot({place, parcels}, route){
    if (route.length == 0){
        let parcel = parcels[0];
        if (parcel.place != place){
            route = findRoute(roadGraph, place, parcel.place);
        }
        else{
            route = findRoute(roadGraph, place, parcel.address)
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

//Function to compare two robots
function compareRobots(robot1, memory1, robot2, memory2){
   let logArray = [];
   let count = 100;
   let total = [0,0];
    for(let i = 0; i < count; i++){
        let task = VillageState.random();
        logArray.push({Task: i, 'Robot 1':runRobot(task, robot1, memory1), 'Robot 2':runRobot(task, robot2, memory2)});
        total[0] += logArray[i]['Robot 1'];
        total[1] += logArray[i]['Robot 2'];
    }
    total = total.map(n => n/count);
    console.log(`Robot 1 took an average of ${Math.floor(total[0])} turns.\nRobot 2 took an average of ${Math.floor(total[1])} turns.`)
    
}
/*
//A new better faster robot, my attempt, its broken and kind of ugly
function betterBot({place, parcels}, route){
if(route.length == 0){
    if(place != parcel.place){
        route = findRoute(roadGraph, place, parcels[0].place);
        for(i = 0; i < parcels.length; i++){
            parcel = parcels[i]
            let test_route = findRoute(roadGraph, place, parcel.place)
            if(test_route.length < route.length){ route = test_route;}
        }
        return route;
    }
    else{
    route = findRoute(roadGraph, place, parcel.address)
    for(i = 0; i < parcels.length; i++){
        parcel = parcels[i]
        let test_route = findRoute(roadGraph, place, parcel.address)
        if(test_route.length < route.length){route = test_route;}
        }
        return route
    }
}
return {direction: route[0], memory: route.slice(1)};
}
*/

function bookbetterbot({place, parcels}, route){
if (route.length == 0){
    //Using the map method to turn each parcel into a route
    let routes = parcels.map(parcel =>{
        if(parcel.place != place){
            return{route: findRoute(roadGraph, place, parcel.place), pickup: true}
        }
        else{
            return{route: findRoute(roadGraph, place, parcel.address), pickup: false}
        }
    });

    function score({route, pickup}){return (pickup? 0.5 :0) - route.length }
    route = routes.reduce((a,b) => score(a) > score(b) ? a:b).route;
    }
return{direction: route[0], memory: route.slice(1)};
}



class PGroup{

    constructor(value){
        this.values = value;
    }

    has(index){
        if(this.values.includes(index)){return true;}
        return false;
    }

    add(index){
        if(this.has(index)){return this;}
        let add_array = this.values.concat(index);        
        return new PGroup(add_array);
    }

    delete(index){
        if(this.has(index)){
            let delete_array = this.values.filter(n => n != index);
            return new PGroup(delete_array);
        }
       return this;
    }

};

PGroup["empty"] = new PGroup([]);


//Run Code Here
//compareRobots(goalOrientedRobot, [], bookbetterbot, []);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(a);
console.log(ab);
console.log(a.has("b"));
console.log(b.has("a"));
//runRobot(VillageState.random(), bookbetterbot,[]);