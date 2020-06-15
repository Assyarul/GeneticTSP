new p5();

var gen = new GeneticAlgorithm(20, 0.2, 400, 400);
gen.initialize(5);

function setup() {
    createCanvas(400,400)
    gen.bestFitness.render();

}

function draw() {
    background(220);
    gen.createNewGen();
    gen.bestFitness.render();

}

function mousePressed(){
}