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
    constructor(x, y, test) {
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
        
        // Not important yet
        this.orbit = {centre: 0, path: 0};
        this.testLine = createVector(0, 0);

        this.test = test;
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
        let wander = this.getWander(); // Gets wandering direction

        // // If particle is close to another
        // if (closeness < 200 && closeness > this.size*2) { 
        //     let pathToPart = this.getPathToPart(); // Gets path to nearest particle
        //     pathToPart = pathToPart.normalize() // Normalizes this path

        //     wander.setMag(wander.mag() * (closeness/200)); // Sets magnitude of wander path, stronger the further from other
        //     pathToPart.setMag(-(closeness/800)+0.25); // Sets magnitude of path to other, stronger the closer
        //     dir = p5.Vector.add(wander, pathToPart); // Adds both paths to the direction
        //     dir.setMag(dir.mag()*this.speed); // Adjusts magnitude of direction to speed
        // // If the particle is not close to any other
        // } else {
        //     dir = wander;
        //     dir.setMag(wander.mag() * this.speed);
        // }

        // If particle is close to another
        if (closeness < 300 && closeness > this.size*2) { 
            let pathToPart = this.getPathToPart(); // Gets path to nearest particle
            pathToPart = pathToPart.normalize() // Normalizes this path

            wander.setMag(wander.mag() * (closeness/300)); // Sets magnitude of wander path, stronger the further from other
            pathToPart.setMag(-(closeness/1200)+0.25); // Sets magnitude of path to other, stronger the closer
            dir = p5.Vector.add(wander, pathToPart); // Adds both paths to the direction
            dir.setMag(dir.mag()*this.speed); // Adjusts magnitude of direction to speed
        // If the particle gets very close to another
        // } else if (closeness < this.size*1.5+10) {
        //     this.getOrbit();
        // If the particle is not close to any other
        } else {
            dir = wander;
            dir.setMag(wander.mag() * this.speed);
        }

        if (closeness < this.size*2) {
            this.getOrbit();
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

        let vecToPart = p5.Vector.sub(info.part.pos, this.pos); // Calculates vector from particle to nearest
        return vecToPart
    }

    getOrbit() {
        let info = this.getCloseness()

        if (!info.part.orbit.centre) {
            let vecToCentre = this.getPathToPart();

            vecToCentre = vecToCentre.setMag(vecToCentre.mag()*0.5);
            this.orbit.centre = p5.Vector.add(this.pos, vecToCentre);
        }

        // For testing
        ellipse(this.orbit.centre.x, this.orbit.centre.y, 5);
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
        if (closeness > 300) {
            this.colour = this.outColour;
        } else if (closeness > this.size * 1.5) {
            let lerpVal = map(closeness, 60, 300, 1, 0)
            this.colour = lerpColor(this.outColour, this.inColour, lerpVal)
        }

    }
}


// Function for testing creating particles
function mousePressed() {
    let newPeep = new Peep(mouseX, mouseY, true);
    peeps.push(newPeep);
}