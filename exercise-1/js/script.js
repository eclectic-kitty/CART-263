/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

/*
We need the following features:
- Grid background
- Snake head that can move around, only on grid
- Screen loops
- Snake segments moving behind
- Eating apples increases score
- Increasing number of segments
- Snake head colliding with segment ends game

        0
        -
        |
 3 - --   -- + 1
        |    
        +
        2

headX and headY need to be between 0 and 9
*/


"use strict";

let size = 50; // Checkerboard size variable

let headX = 5;
let headY = 5;
let headXDir = 0;
let headYDir = 0;
let frameCount = 0;


function setup() {
    createCanvas(500, 500);
}


function draw() {
  background(215, 190, 255); // Sets background to black

  rectMode(CORNER);
  fill(255, 190, 215); // Sets the colour of the square with a random hue
  noStroke();
  
  for (let y = 0; y < height/size; y++) { // Loop for the y coordinates
    for (let x = 0; x < width/size; x++) {  // Loop for the x coordinates
      if (y%2 - x%2 == 0) { // Code only runs every other square space
        rect(x*size, y*size, size); // Draws a square
      }
    }
  }

  // Draws Snake head
  fill(190, 255, 195);
  rect(headX * 50 + 7.5, headY * 50 + 7.5, 35, 35, 10);

  // Updates snake head position every 30 frames
  if (frameCount == 29) {
      frameCount = 0

      headX += headXDir;
      headY += headYDir;
  } else {
    frameCount++;
  }
}


// Movement controls for snake head
function keyPressed() {
  if (keyCode == UP_ARROW) {
    headXDir = 0;
    headYDir = -1;
  } else if (keyCode == RIGHT_ARROW) {
    headXDir = 1;
    headYDir = 0;
  } else if (keyCode == DOWN_ARROW) {
    headXDir = 0;
    headYDir = 1;
  } else if (keyCode == LEFT_ARROW) {
    headXDir = -1;
    headYDir = 0;
  }
}

