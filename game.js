
var keys = [];
function preload() {
move = 2
p1Y = (window.innerHeight/2)
p1X = (window.innerWidth/2)



}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);




}


function draw() {
    background(0);
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