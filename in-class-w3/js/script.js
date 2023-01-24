/**
bla bla bla
Aurora Becerra Granados

bla
bla
bla
*/


"use strict";


let ball; // Declare object-holding variable


// Just initializes canvas
function setup() {
    createCanvas(500, 500);
    ball = new Particle();
}


function draw() {
  background(215, 190, 255); // Sets background colour, currently purple
  ball.display();
}


// Segments class
class Particle {
  constructor(x, y, xDir, yDir, pos) { 
    this.x = width/2; // x position
    this.y = height/2; // y position
  }

  display() {
    ellipse(this.x, this.y, 10);
  }
}