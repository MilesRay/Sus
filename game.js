
var keys = [];
let move = 2
let p1Y = 272
let p1X = 280
function preload() {
    img = loadImage('Background1.png');
}

function setup() {
    createCanvas(960,544);




}


function draw() {
    background(0);
    image(img,0,0)
    push();
    stroke(255);
    fill(255);
    console.log(p1X,p1Y);

    
    rect(p1X,p1Y,50,80);
    
    rect((window.innerWidth/2),window.innerHeight/2,1,1);

    pop();

    //player movement

    if (keys[87]) {
        p1Y -= move
    }     

    if (keys[83]) {
        p1Y += move
    }
    if (keys[65]) {
        p1X -= move
    }
    if (keys[68]) {
        p1X += move
    }


    //window boundaries
    if (p1X < 0) {
        p1X += move
    }
    if (p1X > window.innerWidth) {
        p1X -= move
    }
    if (p1Y < 0) {
        p1Y += move
    }
    if (p1Y > window.innerHeight) {
        p1Y -= move
    }
    



}



function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false
}