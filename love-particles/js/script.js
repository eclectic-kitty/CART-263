/**
Particles Deeply In Love
Aurora Becerra Granados

An attempt at representing the phrase "deeply in love" with a particle system.
For more details, see readme file.
*/

const peeps = []; // Array to hold particles
let peepNum = 4; // Number of variables created

function setup() {
    createCanvas(1000, 1000); // Sets canvas size
    colorMode(HSB); // Sets colour system to Hue, Saturation, Brightness
    noStroke(); // Removes strokes from any drawn shapes
    frameRate(30); // Limits frame rate to prevent stuttering on less powerful computers

    // Creates particles
    for (let i = 0; i < peepNum; i++) {
        let newPeep = new Peep(random(width), random(height));
        peeps.push(newPeep);
    }
}


function draw(){
    background(290, 277, 8); // set background colour - deep red-purple

    // Runs each particle's necessary functions
    for (let i = 0; i < peeps.length; i++) {
        peeps[i].move(); // Updates the particles' positions
        peeps[i].mood(); // Updates the particles' visual aspects
        peeps[i].display(); // Draws the particles
    }
}

class Peep {
    constructor(x, y) {
        this.pos = createVector(x, y); // vector that represents particle's position
        this.speed = 6; // speed at which particles will move
        this.size = 60; // size of particles
        // Sets limits for transportation, a little bit beyond screen
        this.xLim = [0 - this.size, width + this.size/2];
        this.yLim = [0 - this.size/2, height + this.size/2];

        this.highColour = color(338, 50, 70); // Colour for highlights on particles - light pink
        this.outColour = color(290, 80, 25); // Colour for particles when far from each other - dark reddish purple, similar to background colour
        this.inColour = color(354, 90, 35); // Colour for particles when in love - deep red
        this.colour = this.outColour; // variable for particle's current colour, initialized to the out of love colour
        this.lastBlur = 0 // initialises variable to keep track of blur

        // Initializes offset variables for noise
        this.xoff = random(1000);
        this.yoff = random(1000);
    }

    // Displays particle
    display() {
        // Draws circle
        fill(this.colour);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);

        // Draws highlight
        noFill();
        stroke(this.highColour);
        strokeWeight(3);
        arc(this.pos.x, this.pos.y, this.size*0.6, this.size*0.6, (6.75*PI)/6, (4.25*PI)/3);

    }

    move() {
        let closeness = this.getCloseness().close; // Gets distance from enarest particle
        let dir = createVector(0, 0); // Initialises direction to move in

        // If particle is close to another. but not too close
        if (closeness < 300 && closeness > this.size*2) { 
            let wander = this.getWander(); // Gets wandering direction
            let pathToPart = this.getPathToPart(); // Gets path to nearest particle as a vector

            wander.setMag(wander.mag() * (closeness/300)); // Sets magnitude of wander path, stronger the further from other particle
            pathToPart.setMag(-(closeness/1200)+0.25); // Sets magnitude of path to other, stronger the closer to other particle
            dir = p5.Vector.add(wander, pathToPart); // Adds both path vectors to the direction
            dir.setMag(dir.mag()*this.speed); // Adjusts magnitude of direction to speed
        } else {
            dir = wander;
            dir.setMag(wander.mag() * this.speed);
        }

        this.pos.add(dir);

        // Loops screen
        if (this.pos.x < this.xLim[0]) { // From left edge
            this.pos.x = this.xLim[1]; // to right edge
        }
        if (this.pos.x > this.xLim[1]) { // From right edge
            this.pos.x = this.xLim[0]; // to left edge
        }
        if (this.pos.y < this.yLim[0]) { // From top edge
            this.pos.y = this.yLim[1]; // to bottom edge
        }
        if (this.pos.y > this.yLim[1]) { // From bottom edge
            this.pos.y = this.yLim[0]; // to top edge
        }
    }

    // Gets path for wandering
    getWander() {
        let wander = createVector(0, 0); // Initialises variable for path
        wander.x = map(noise(this.xoff), 0, 1, -1, 1); // Calculates noisy change on x axis
        wander.y = map(noise(this.yoff), 0, 1, -1, 1); // Calculates noisy change on y axis
        wander.limit(1); // Limits magnitude of path to 1

        // Moves noise offset variables along
        this.xoff += 0.01;
        this.yoff += 0.01;

        //wander = createVector(xWander, yWander);
        return wander;
    }

    // Gets a vector from particle to nearest particle
    getPathToPart() {
        let info = this.getCloseness() // Gets closest particle & distance to it

        let vecToPart = p5.Vector.sub(info.part.pos, this.pos); // Calculates vector from self to nearest particle
        pathToPart = pathToPart.normalize() // Normalizes this path vector
        return vecToPart
    }

    // calculates distance from nearest particle
    getCloseness() {
        let info = {part: this, close: width}; // Object to hold nearest particle & distance from it
        for (let i = 0; i < peeps.length; i++) { // Runs on all particles
            if (peeps[i] != this) { // other than itself
                let d = this.pos.dist(peeps[i].pos); // Gets distance from current particle
                if (info.close > d) { // If this distance is closer than the last one
                    info.part = peeps[i]; // The current particle is saved
                    info.close = d; // The current distance is saved
                }
            }
        }
        return info;
    }

    // Changes visual elements of particle
    mood() {
        let closeness = this.getCloseness().close; // gets distance from nearest particle

        // First part focuses on blur
        let blur = round(closeness/50, 1); // blur is set relative to closeness
        if (this.lastBlur - blur > 1 || this.lastBlur - blur < -1) { // If the change in blur is too large,
            blur = lerp(this.lastBlur, blur, 0.1); // Blur is lerped for smoothness
        }
        drawingContext.filter = 'blur(' + String(blur) + 'px)'; // blur is applied
        this.lastBlur = blur // Current blur is recorded

        // Second part focuses on the colour
        if (closeness > 300) { // If far from any other particle,
            this.colour = this.outColour; // colour is set to the darker foclour
        } else { // If closer
            let lerpVal = map(closeness, 60, 300, 1, 0) // A lerp position/amount is set from how close self is to other particle
            this.colour = lerpColor(this.outColour, this.inColour, lerpVal) // And the colour is assigned, the closer, the closer to the lighter colour
        }

    }
}