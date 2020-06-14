class DNA {
    constructor (locations){
        //array of locations
        this.locations = locations;
    }

    getTotalDistance() {
        if (this.locations.size==0){
            return 0;
        }
        let previous = this.locations[0];
        let distance = 0;
        for (let i=0;i<this.locations.length;i++) {
            let current = this.locations[i];
            distance += dist(previous.x,previous.y,current.x,current.y); //use p5.js dist() method
            previous = current;
        }

        return round(distance);
    }
    //function passed in to store fitness level in object.
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
        text("Distance: " + this.getTotalDistance(),width/2,20);

    }

    //for debugging purposes
    toString(){
        return "["+this.locations.join()+"] \n";
    }


}