//data for the whole graph for TSP
class Map {
    constructor(){
        //array of locations
        this.map =[];
        //look-up table for distances between locations to reduce computations
        this.memo = {};
    }

    add(location) {
        this.map.push(location);
    }
    
    calculateDistances(){
        for (let i =0;i<this.map.length;i++) {
            this.memo[this.map[i]] = {};
            for (let j = 0;j<this.map.length;j++) {
                if (i != j) {
                    this.memo[this.map[i]][this.map[j]] = dist(this.map[i].x, this.map[i].y, this.map[j].x, this.map[j].y);
                }
            }
        }
        
    }

    getDistance(location1,location2) {
        return this.memo[location1][location2];
        
    }
    //generate a random ordering of the locations via Fisher Yates from p5.js shuffle method
    generateRandom() {
        return new DNA(shuffle(this.map)); 
    }
}