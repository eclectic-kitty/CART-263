/*
List of features:
- Wandering 🍞
- Custom circle shape
    - ability to grow
- Distance sensing
    - moving towards
        - entering orbit
    - Growing towards each other
    - Blur
    - Colour change
- Extra colours???
*/

const peeps = []; // array to hold particles
let peepNum = 10
let maxSize = 40;

let xLim = [];
let yLim = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB);
    xLim = [0 - maxSize, width + maxSize/2];
    yLim = [0 - maxSize/2, height + maxSize/2];

    for (let i = 0; i < peepNum; i++) {
        let newPeep = new Peep(random(width), random(height));
        peeps.push(newPeep);
    }
    peeps[0].checkCloseness();
}


function draw(){
    background(288, 277, 8);

    for (let i = 0; i < peeps.length; i++) {
        peeps[i].wander();
        peeps[i].display();
    }
}

// Particle class
class Peep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = random(259);
        this.colour = color(310, 71, 50);

        this.xoff = random(1000);
        this.yoff = random(1000);
        this.speed = 5;
    }

    // Displays particle
    display() {
        fill(this.colour);
        ellipse(this.x, this.y, maxSize);
    }

    wander() {
        this.x += map(noise(this.xoff), 0, 1, -this.speed, this.speed);
        this.y += map(noise(this.yoff), 0, 1, -this.speed, this.speed);
        this.xoff += 0.01
        this.yoff += 0.01

        // Loops screen
        if (this.x < xLim[0]) { // From left edge
            this.x = xLim[1]; // to right edge
        }
        if (this.x > xLim[1]) { // From right edge
            this.x = xLim[0]; // to left edge
        }
        if (this.y < yLim[0]) { // From top edge
            this.y = yLim[1]; // to bottom edge
        }
        if (this.y > yLim[1]) { // From bottom edge
            this.y = yLim[0]; // to top edge
        }
    }

    checkCloseness() {
        for (let i = 0; i < peeps.length; i++) {
            if (peeps[i] != this) {
                let closeness = dist(this.x, this.y, peeps[i].x, peeps[i].y);
                print(closeness);
            }
        }
    }
}


// Function for testing creating particles
function mousePressed() {
    let newPeep = new Peep(mouseX, mouseY);
    //let newPeep = new Peep();
    peeps.push(newPeep);
}