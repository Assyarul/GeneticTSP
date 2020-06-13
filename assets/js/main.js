

function setup() {
    createCanvas(400,400)
    var gen = new GeneticAlgorithm(5, 0.1, width, height);
    gen.initialize(5);

    gen.population[0].render();

}

function draw() {

}