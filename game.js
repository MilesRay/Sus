
x = 100
y = 100
var keys = [];
function preload() {



}

function setup() {
    createCanvas(1000,1000);




}


function draw() {
    background(0);
    push();
    stroke(255);
    fill(255);

    
    rect(x,y,100,10)

    pop();

    if (keys[87]) {
        y += 2
    }     

    if (keys[83]) {
        y -= 2
    }
    if (keys[65]) {
        x -= 2
    }
    if (keys[68]) {
        x+= 2
    }

}



function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false
}