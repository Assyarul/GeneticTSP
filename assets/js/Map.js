//data for the whole graph for TSP
class Map {
    constructor(){
        //array of locations
        this.map =[];
    }

    add(location) {
        this.map.push(location);
    }

    //generate a random ordering of the locations via Fisher Yates from p5.js shuffle method
    generateRandom() {
        return new DNA(shuffle(this.map)); 
    }
}