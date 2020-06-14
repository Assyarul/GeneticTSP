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
        this.totalFitness = 0; //sum of total fitness values in the population. will be used for normalizing
        this.generatePopulation();
    }

    generatePopulation() {
        this.population = [];
        for (let i = 0; i < this.total; i++) {
            let member = this.map.generateRandom();
            this.population.push(member);
            member.setFitness(this.fitness(member));
            this.totalFitness += member.fitness;
        }
        this.normalizeFitness();

        let accprob = 0;
        for (let i = 0; i < this.total; i++) {
            accprob += this.population[i].fitness;
        }
        
        console.log("Total Prob: " + accprob);
    }

    createNewGen() {
        if (!this.init) {
            console.error("Genetic Algorithm has not been initialized");
        } else {
            let newGen = [];
 
        }
    }

    //fitness function just calculate distance between the two points and inverse it. higher total distance -> lower fitness level
    fitness(dna) {
        return 1/dna.getTotalDistance();
    }

    //normalize fitness s.t member.fitness now represents a probability
    normalizeFitness(){
        for (let i =0; i< this.total; i++) {
            let member = this.population[i];
            member.fitness /= this.totalFitness;
        }
    }

    //randomly select a member in the population according to its fitness
    //Uses fitness proportionate method
    selectOne(){
        let randomNum = Math.random();
        console.log("Selector: "+randomNum);
        let accumulated = 0;
        for (let i =0; i< this.total; i++) {
            let member = this.population[i];
            if (member.fitness + accumulated > randomNum ) {
                return i;//this.population[i];
            }
            accumulated += member.fitness;
        }
    }
    //typical crossover algorithms like single-point will not work given constraints of TSP
    // use 
    crossover(a,b) {

    }

    mutate(a) {

    }

    //debugging purposes
    printPopulation() {
        console.log(this.population.join());
        
    }

}