class GeneticAlgorithm {
    constructor(numLocation,mutationRate,width,height) {
        //number of Locations in the map. More means alot longer to find shortest cycle
        this.numLocation = numLocation;
        
        this.mutationRate = mutationRate;
        this.map = new Map();

        //stored to prevent any x,y coordinates to be out of canvas
        this.height = height;
        this.width = width;

        this.init = false;
    }

    //initialize population with designated generate algorithm
    initialize(total) {
        for (let i=0; i<this.numLocation;i++){
            this.map.add(new Location(random(0,width),random(0,height))); //add this.numLocation random points to map
        }

        this.total = total;
        this.generatePopulation();
    }

    generatePopulation() {
        this.population = [];
        for (let i = 0; i < this.total; i++) {
            this.population.push(this.map.generateRandom());
        }
    }

    //fitness function just calculate distance between the two points and inverse it. higher total distance -> lower fitness level
    fitness(dna) {
        return 1/dna.getTotalDistance();
    }

    //typical crossover algorithms like single-point will not work given constraints of TSP
    // use 
    crossover(a,b) {

    }

    mutate(a) {

    }

    createNewGen() {
        if (!this.init) {
            console.error("Genetic Algorithm has not been initialized");
        } else {

        }
    }

    //debugging purposes
    printPopulation() {
        console.log(this.population.join());
        
    }

}