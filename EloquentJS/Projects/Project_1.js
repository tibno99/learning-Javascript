/*
Project 1: A Robot
*/
const roads = [
    "Alice's House-Bob's House",     "Alice's House-Cabin",
    "Alice's House-Post Office",     "Bob's House-Town Hall",
    "Daria's House-Ernie's House",   "Daria's House-Town Hall",
    "Ernie's House-Grete's House",   "Grete's House-Farm",
    "Grete's House-Shop",            "Marketplace-Farm",
    "Marketplace-Post Office",       "Marketplace-Shop",
    "Marketplace-Town Hall",         "Shop-Town Hall"
  ];

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
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}




 let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}]);

 let next = first.move("Alice's House");

 console.log(next);