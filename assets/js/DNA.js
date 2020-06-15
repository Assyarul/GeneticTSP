class DNA {
    constructor (locations){
        //array of locations
        this.locations = locations;
        this.fitness = 0;
        this.distance = 0;
    }


    randomSwap(){
        // pick two random indexes, swap them
        let index1 = Random.getRandomInt(0,this.locations.length-1);
        let index2 = Random.getRandomInt(0,this.locations.length-1);

        //generate until different integers
        if (index2 == index1) {
            index2 = Random.getRandomInt(0,this.locations.length-1);
        }
        let temp = this.locations[index1];
        this.locations[index1] = this.locations[index2];
        this.locations[index2] = temp;
    }

    //does OX crossover algorithm
    crossover(mate) {
        let newLocations=[]

        let firstcut = Random.getRandomInt(0,this.locations.length-2); //cut number represents the cutting AFTER the index. e.g cut = 1 will split 0 1 | 2 3 ...
        let secondcut = Random.getRandomInt(0,this.locations.length-2);

        while (firstcut == secondcut) {
            secondcut = Random.getRandomInt(0,this.locations.length-1);
        }

        //swap numbers if secondcut lower than firstcut;
        if (secondcut < firstcut) {
            let temp = firstcut;
            firstcut = secondcut;
            secondcut = temp;
        }
        //place the middle section into child
        for (let i=firstcut+1; i<=secondcut;i++) {
            newLocations.push(this.locations[i]); 
        }

        
        let counter = 0;
        let firstsection = [];
        //putting in remaining cities into child from mate
        for (let i = 0; i<mate.locations.length;i++){
            if (!newLocations.includes(mate.locations[i])) {
                if (counter < firstcut+1) {
                    firstsection.push(mate.locations[i]);
                } else {
                    newLocations.push(mate.locations[i]);
                }
                counter++;
            }
        }
        newLocations = firstsection.concat(newLocations);
        return new DNA(newLocations);
    }

    setFitness(fitness) {
        this.fitness = fitness;
    }

    render() {
        let previous = this.locations[0];
        previous.render();
        for (let i=0;i<this.locations.length;i++) {
            let current = this.locations[i];
            current.render();
            strokeWeight(1);
            line(previous.x,previous.y,current.x,current.y);
            previous = current;
        }
        line(previous.x,previous.y,this.locations[0].x,this.locations[0].y);
        textSize(20);
        text("Distance: " + round(this.distance),150,20);
    }

    //for debugging purposes
    toString(){
        return "["+this.locations.join()+"] \n";
    }


}