/*
List of features:
- Wandering
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

const peeps = [];

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
}
function draw(){
    background(288, 277, 8);

    for (let i = 0; i < peeps.length; i++) {
        peeps[i].wander();
        peeps[i].display();
    }
}

class Peep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = random(259);
        this.colour = color(310, 71, 16);
    }

    display() {
        
        fill(this.colour);
        ellipse(this.x, this.y, 50);
    }

    wander() {

    }
}

function mousePressed() {
    let newPeep = new Peep(mouseX, mouseY);
    peeps.push(newPeep);
}