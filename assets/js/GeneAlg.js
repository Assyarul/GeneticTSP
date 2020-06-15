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
            this.map.add(new Location(random(0,this.width),random(0,this.height))); //add this.numLocation random points to map
        }
        this.map.calculateDistances();

        this.total = total;
        this.numGenerations = 1; // initial population set as 1st generation.
        this.totalFitness = 0; //sum of total fitness values in the population. will be used for normalizing
        this.bestFitness = new DNA(); // point to member with best fitness
        this.init= true;
        this.generatePopulation();
    }

    generatePopulation() {
        this.population = [];
        for (let i = 0; i < this.total; i++) {
            let member = this.map.generateRandom();
            this.population.push(member);
            member.setFitness(this.fitness(member));
            this.totalFitness += member.fitness;

            //determine if fitter member exist and change accordingly
            if (member.fitness > this.bestFitness.fitness){
                this.bestFitness = member;
            }
        }
    }

    createNewGen() {
        if (!this.init) {
            console.error("Genetic Algorithm has not been initialized");
        } else {
            let newGen=[];
            let newTotalFitness = 0;
            while (newGen.length < this.total) {
                //for now ignore case parent1 == parent2. will definitely lead to more homogeny in population at later stages.
                let parent1 = this.selectOne();
                let parent2 = this.selectOne();

                //ordering of parents in crossover matters due to crossover algo implemented
                let child1 = parent1.crossover(parent2);
                this.mutate(child1);
                child1.setFitness(this.fitness(child1)); 
                newTotalFitness +=child1.fitness;
                if (child1.fitness > this.bestFitness.fitness){
                    this.bestFitness = child1;
                }
                newGen.push(child1);

                //if there's still space. probably can refactor code better here.
                if (newGen.length < this.total) {
                    let child2 = parent2.crossover(parent1);
                    this.mutate(child2);
                    child2.setFitness(this.fitness(child2));
                    newTotalFitness +=child2.fitness;

                    if (child2.fitness > this.bestFitness.fitness){
                        this.bestFitness = child2;
                    }
                    newGen.push(child2);
                }
            }
            this.population = newGen;
            this.totalFitness = newTotalFitness;
        }
    }

    //fitness function just calculate distance between the two points and inverse it. higher total distance -> lower fitness level
    //side-effect of storing dna distance. 
    fitness(dna) {
        if (dna.length==0){
            return 0;
        }
        let previous = dna.locations[0];
        let distance = 0;
        for (let i=1;i<dna.locations.length;i++) {
            let current = dna.locations[i];
            distance += this.map.getDistance(previous,current); 
            previous = current;
        }
        distance+= this.map.getDistance(previous,dna.locations[0]);
        dna.distance = distance;
        return 1/distance;
 
    }

    //randomly select a member in the population according to its fitness
    //Uses fitness proportionate method
    selectOne(){
        let randomNum = random(0,this.totalFitness);
        let accumulated = 0;
        for (let i =0; i< this.total; i++) {
            let member = this.population[i];
            if (member.fitness + accumulated > randomNum ) {
                return this.population[i];
            }
            accumulated += member.fitness;
        }
    }

    //simple chance for two random locations to swap.
    mutate(a) {
        let randomNum = Math.random();

        if (randomNum < this.mutationRate) {
            a.randomSwap();
        }
    }

    //debugging purposes
    printPopulation() {
        console.log(this.population.join());
        
    }

}