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


let headX = 6;
let headY = 6;
let headDir = 0;
let frameCount = 0;


/**
Description of setup
*/
function setup() {
    createCanvas(500, 500);
}


/**
Description of draw()
*/
function draw() {
    background(215, 190, 255); // Sets background to black
    let size = 50; // Initiates size variable

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

    //rectMode(CENTER);
    fill(190, 255, 195);
    rect(headX * 50 + 7.5, headY * 50 + 7.5, 35, 35, 10);

    print(frameCount);
    if (frameCount == 29) {
        frameCount = 0

        if (headDir == 0) {
          headY -= 1;
        } else if (headDir == 1) {
          headX += 1;
        } else if (headDir == 2) {
          headY += 1;
        } else if (headDir == 3) {
          headX -= 1;
        }
    } else {
      frameCount++;
    }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    headDir = 0;
  } else if (keyCode == RIGHT_ARROW) {
    headDir = 1;
  } else if (keyCode == DOWN_ARROW) {
    headDir = 2;
  } else if (keyCode == LEFT_ARROW) {
    headDir = 3;
  }
}