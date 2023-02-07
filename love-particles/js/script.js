/*
List of features:
- Wandering 🍞
- Custom circle shape
    - ability to grow
- Distance sensing 🍞
    - moving towards
        - entering orbit
    - Growing towards each other
    - Blur 🍞
    - Colour change
- Extra colours???
*/

const peeps = []; // array to hold particles
let peepNum = 3;
let maxSize = 40;

let xLim = [];
let yLim = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB);
    noStroke();
    frameRate(30);

    xLim = [0 - maxSize, width + maxSize/2];
    yLim = [0 - maxSize/2, height + maxSize/2];

    for (let i = 0; i < peepNum; i++) {
        let newPeep = new Peep(random(width), random(height));
        peeps.push(newPeep);
    }
}


function draw(){
    background(288, 277, 8);

    for (let i = 0; i < peeps.length; i++) {
        peeps[i].move();
        peeps[i].mood();
        peeps[i].display();
    }
    print(frameRate());
}

// Particle class
class Peep {
    constructor(x, y, test) {
        this.x = x;
        this.y = y;
        this.dir = random(259);
        this.colour = color(310, 71, 50);
        this.lastBlur = 0

        this.xoff = random(1000);
        this.yoff = random(1000);
        this.speed = 6;

        this.test = test;
    }

    // Displays particle
    display() {
        fill(this.colour);
        ellipse(this.x, this.y, maxSize);
    }

    move() {
        let wander = this.checkWander();
        let closeness = this.checkCloseness().closeness;

        
        this.x += wander.x;
        this.y += wander.y;


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

    // Calculates change in movement, wandery
    checkWander() {
        let xWander = map(noise(this.xoff), 0, 1, -this.speed, this.speed);
        let yWander = map(noise(this.yoff), 0, 1, -this.speed, this.speed);
        this.xoff += 0.01;
        this.yoff += 0.01;

        let wander = { x: xWander, y: yWander};
        return wander;
    }

    // Calculates closeness to nearest particle
    checkCloseness() {
        let partner = {id: this, closeness: width};
        for (let i = 0; i < peeps.length; i++) {
            if (peeps[i] != this) {
                let d = dist(this.x, this.y, peeps[i].x, peeps[i].y);
                if (partner.closeness > d) { 
                    partner.id = peeps[i];
                    partner.closeness = d;
                }

            }
        }
        return partner;
    }

    // Changes visual elements of particle
    mood() {
        // First part focuses on blur

        let closeness = this.checkCloseness().closeness; // checks distance from nearest particle
        let blur = round(closeness/50, 1); // blur amount is set relative to closeness
        // If the change from last blur is too large (such as when a particle crosses the screen), 
        if (this.lastBlur - blur > 1 || this.lastBlur - blur < -1) {
            blur = lerp(this.lastBlur, blur, 0.1); // They are lerped to prevent sudden changes
        }
        drawingContext.filter = 'blur(' + String(blur) + 'px)'; // blur is applied
        this.lastBlur = blur // Current blur is recorded

        // Second part focuses on the colour


    }
}


// Function for testing creating particles
function mousePressed() {
    let newPeep = new Peep(mouseX, mouseY, true);
    peeps.push(newPeep);
}