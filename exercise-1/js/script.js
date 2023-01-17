/**
Snake Exercise
Aurora Becerra Granados

This is a small exercise for getting back into code, trying to make a small Snake game
Snake head is controlled with arrow keys
Currently, new segments can be added by pressing "a"
*/


"use strict";

let size = 50; // Checkerboard square size
let headX = 5; // x position of snake head
let headY = 5; // y position of snake head
let headXDir = 0; // x direction of snake head, 
let headYDir = 0; // y direction of snake head
let frameCount = 0; // frame counter for movement
let segments = []; // array to hold segments


// Just initializes canvas
function setup() {
    createCanvas(500, 500);
}


function draw() {
  background(215, 190, 255); // Sets background colour, currently purple

  fill(255, 190, 215); // Sets the colour of half the squares, pink
  noStroke();
  
  for (let y = 0; y < height/size; y++) { // Loop for the y coordinates
    for (let x = 0; x < width/size; x++) {  // Loop for the x coordinates
      if (y%2 - x%2 == 0) { // Code only runs every other square
        rect(x*size, y*size, size); // Draws a square
      }
    }
  }

  // Draws snake head
  fill(190, 255, 195);
  rect(headX * 50 + 7.5, headY * 50 + 7.5, 35, 35, 10);

  // Draws snake body segments
  for (let i=0; i < segments.length; i++) {
    rect(segments[i].getX() * 50 + 7.5, segments[i].getY() * 50 + 7.5, 35, 35, 10); // draws square segment
  }

  // Updates snake head position every 30 frames
  if (frameCount == 29) {
      frameCount = 0 // Resets frame counter
      // Direction variables are only ever -1, 0 or 1
      // They then get added to position and advance position by that amount of squares
      headX += headXDir; // Updates x position
      headY += headYDir; // Updates y position
  } else {
    frameCount++; // Increases frame counter
  }
}


function keyPressed() {
  // Movement controls for snake head
  if (keyCode == UP_ARROW) {
    // x direction is set to be still, y direction is set to up
    headXDir = 0;
    headYDir = -1;
  } else if (keyCode == RIGHT_ARROW) {
    // x position is set to right, y position is set to be still
    headXDir = 1;
    headYDir = 0;
  } else if (keyCode == DOWN_ARROW) {
    // x position is set to be still, y position is set to down
    headXDir = 0;
    headYDir = 1;
  } else if (keyCode == LEFT_ARROW) {
    // x position is set to left, y position is set to be still
    headXDir = -1;
    headYDir = 0;
  }


  // On a being pressed, creates new body segment
  if (keyCode == 65) {
    // Sets position to be behind head
    let tempX = headX - headXDir; // x is set to head's x - the direction
    let tempY = headY - headYDir; // same for y
    // new segment object is created, 
    let newSegment = new SnakeSegment(tempX, tempY, headXDir, headYDir, segments.length);
    segments.push(newSegment); // new segment is added to segments array
  }
}


// Segments class
class SnakeSegment {
  constructor(x, y, xDir, yDir, pos) { 
    this.x = x; // x position
    this.y = y; // y position
    this.xDir = xDir; // x direction
    this.yDir = yDir; // y direction
    this.pos = pos; // position of segment in line of segments, ie pos 2 is the second segment after the head
  }
}