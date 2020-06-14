

function setup() {
    createCanvas(400,400)
    var gen = new GeneticAlgorithm(5, 0.1, width, height);
    gen.initialize(5);
    console.table(gen.population,"fitness");
    console.log("Selected "+gen.selectOne());

}

function draw() {

}