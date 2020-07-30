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


//Run code here
//runRobot(VillageState.random(), goalOrientedRobot, []);




//Function to compare two robots
function compareRobots(robot1, memory1, robot2, memory2){
   let outputArray = [];
   let count = 10;
   let outputAvg = [];
    for(let i = 0; i < count; i++){
        let task = VillageState.random();
        outputArray.push({Task: i, 'Robot 1':runRobot(task, robot1, memory1), 'Robot 2':runRobot(task, robot2, memory2)});
    }



    return outputArray;
}


console.log(compareRobots(randomRobot,[], routeRobot, mailRoute));
