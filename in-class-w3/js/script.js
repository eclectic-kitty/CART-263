/**
bla bla bla
Aurora Becerra Granados

bla
bla
bla
*/


"use strict";


let balls = []; // Declare object-holding array
let types = ["hor", "ver"];


// Just initializes canvas
function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
    //noStroke();

    // Creates balls
    for (let i = 0; i < 300; i++) {
      balls[i] = new Particle(random(width), random(height), types[round(random(1))], random(1, 10), random(5, 50));
    }
}


function draw() {
  background(263, 25, 100); // Sets background colour, currently purple

  // For each ball,
  for (let i = 0; i < balls.length; i++) {
    balls[i].update(); // moves and displays
  }
}


// Balls class
class Particle {
  constructor(x, y, type, maxSpeed, size) { 
    this.x = x; // x position
    this.y = y; // y position
    this.type = type;
    print(type);
    this.maxSpeed = maxSpeed;
    this.size = size;
  }

  update() {
    if (this.type == "hor") {
      let speedX = map(mouseX, 0, width, 0, this.maxSpeed)
      this.x += random(-speedX, speedX);
      this.x = constrain(this.x, 0+10, width-10);
    } else if (this.type == "ver") {
      let speedY = map(mouseY, 0, width, 0, this.maxSpeed)
      this.y += random(-speedY, speedY);
      this.y = constrain(this.y, 0+10, height-10);
    }

    let d = dist(this.x, this.y, width/2, height/2);
    d = map(d, 0, 350, 20, 50);
    fill(230, d, 100);

    ellipse(this.x, this.y, this.size);
  }
}