/*
List of features:
- Wandering 🍞
- Custom circle shape
    - ability to grow
- Distance sensing 🍞
    - moving towards each other
        - within certain threshold
        - get position of partner
        - interpolate position towards partner
    - Growing towards each other
    - Blur 🍞
    - Colour change
- Extra colours???
*/

const peeps = []; // array to hold particles
let peepNum = 4;
let maxSize = 40;
let speed = 3;

let xLim = [];
let yLim = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB);
    noStroke();
    frameRate(60);

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
}

// Particle class
class Peep {
    constructor(x, y) {
        this.pos = createVector(x, y);
        //this.dir = random(259);
        this.colour = color(310, 71, 50);
        this.lastBlur = 0

        this.xoff = random(1000);
        this.yoff = random(1000);
    }

    // Displays particle
    display() {
        fill(this.colour);
        ellipse(this.pos.x, this.pos.y, maxSize);
    }

    move() {
        let closeness = this.checkCloseness().close;
        let dir = createVector(0, 0);
        let wander = this.checkWander();
        let pathToPart = this.checkPathToPart();

        if (closeness < 200) {
            wander.setMag(wander.mag() * (closeness/800) + 0.75);
            pathToPart.setMag(-(closeness/800)+0.25);
            dir = p5.Vector.add(wander, pathToPart);
            dir.setMag(dir.mag()*speed);
        } else {
            dir = wander;
            dir.setMag(wander.mag() * speed);
        }

        this.pos.add(dir);


        // Loops screen
        if (this.pos.x < xLim[0]) { // From left edge
            this.pos.x = xLim[1]; // to right edge
        }
        if (this.pos.x > xLim[1]) { // From right edge
            this.pos.x = xLim[0]; // to left edge
        }
        if (this.pos.y < yLim[0]) { // From top edge
            this.pos.y = yLim[1]; // to bottom edge
        }
        if (this.pos.y > yLim[1]) { // From bottom edge
            this.pos.y = yLim[0]; // to top edge
        }
        
    }

    // Calculates change in movement, wandery
    checkWander() {
        /*
        let preWander = createVector(0, 0);
        preWander.x = map(noise(this.xoff), 0, 1, -1, 1);
        preWander.y = map(noise(this.yoff), 0, 1, -1, 1);
        preWander.limit(1);

        let wander = {dir: p5.Vector.normalize(preWander), mag: preWander.mag()};
        */
        let wander = createVector(0, 0);
        wander.x = map(noise(this.xoff), 0, 1, -1, 1);
        wander.y = map(noise(this.yoff), 0, 1, -1, 1);
        wander.limit(1);

        this.xoff += 0.005;
        this.yoff += 0.005;

        //wander = createVector(xWander, yWander);
        return wander;
    }

    checkPathToPart() {
        let info = this.checkCloseness()

        let vecToPart = p5.Vector.sub(info.part.pos, this.pos);
        vecToPart.normalize();
        return vecToPart
    }

    // calculates distance from nearest particle
    checkCloseness() {
        let info = {part: this, close: width}; // Object to hold nearest particle & distance from it
        for (let i = 0; i < peeps.length; i++) {
            if (peeps[i] != this) { // Runs on all particles other than itself
                let d = this.pos.dist(peeps[i].pos); // 
                if (info.close > d) { 
                    info.part = peeps[i];
                    info.close = d;
                }
            }
        }
        return info;
    }

    // Changes visual elements of particle
    mood() {
        // First part focuses on blur
        let closeness = this.checkCloseness().close; // checks distance from nearest particle
        let blur = round(closeness/50, 1); // blur is set relative to closeness

        // If the change from last blur is too large (such as when a particle crosses the screen), 
        if (this.lastBlur - blur > 1 || this.lastBlur - blur < -1) {
            blur = lerp(this.lastBlur, blur, 0.1); // Blur is lerped for smoothness
        }
        drawingContext.filter = 'blur(' + String(blur) + 'px)'; // blur is applied
        this.lastBlur = blur // Current blur is recorded

        // Second part focuses on the colour


    }
}


// Function for testing creating particles
function mousePressed() {
    let newPeep = new Peep(mouseX, mouseY);
    peeps.push(newPeep);
}