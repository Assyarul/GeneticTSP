//Data for each node in the graph. Represents physcial coordinate 
class Location {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    render() {
        strokeWeight(10);
        point(this.x,this.y);
    }

    //for debugging purposes
    toString() {
        return "("+this.x+","+this.y+")";
    }
}