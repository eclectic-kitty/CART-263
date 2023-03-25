/* Tone Colour
Aurora Becerra Granados
for CART 263

This script analyses a set of album covers from my own personal listening history
The average hue, saturation and lightness of each cover is calculated
The covers can then be displayed along any of these parameters
*/

let albums = []; // Array to contain album objects
let albumInv; // Variable to contain albums index
let covers = []; // Array to contain cover images
let modes = ['lightness', 'saturation']; // Array with two display modes

function preload() {
    albumInv = loadTable('assets/albums.csv'); // Load albums index

    // Load cover images
    for (let i = 0; i < 1500; i++) {
        let path = 'assets/images/covers/' + i + '.png'; // path to images
        let cover = loadImage(path); // Loads covers
        covers.push(cover); // Adds them to array
    }
}

function setup() {
    createCanvas(1500, 1500);
    background(0);
    angleMode(DEGREES); // This is for calculating hue averages later

    // Create album objects
    for (let i = 0; i < 1500; i++) {
        let album = new Album(i); // Index is passed along to get cover image & title
        albums.push(album); // and the album is added to the array of albums
    }

    drawCovers();
}

function drawCovers() {
    background(0); // Resets background

    // Display albums
    for (let i = albums.length - 1; i > 0; i--) { // Runs once per album
        let hueRad = 300; // Center of hue circle
        let hueCenter = createVector(width / 2, height / 2); // Variable for the center of the circle of album covers
    
        let posVec = createVector(sin(albums[i].avgHue) * hueRad, cos(albums[i].avgHue) * hueRad); // Sets x and y position along circle of album cover by calculating vector from the hue (angle)
        // The 'if' statement here separates the two modes
        if (modes[0] == 'lightness') {
            posVec = posVec.mult(map(albums[i].avgLight, 0, 100, 2, 0)) // Varies magnitude of vector, ie. distance from center based on lightness. Darkest at edges, lightest at center
        } else if (modes[0] == 'saturation') {
            posVec = posVec.mult(map(albums[i].avgSat, 0, 100, 0, 2)); // Same as above, but based on saturation. Most saturated at edges, least in center.
        }
        posVec.add(hueCenter); // Places circle at defined center

        image(albums[i].cover, posVec.x, posVec.y); // Display cover
    }
}

//Changes mode when spacebar is pressed
function keyPressed() {
    if (keyCode == 32) {
        modes.reverse(); // Changes mode
        drawCovers(); // Redraws covers
    }
}

class Album {
    constructor(index) {
        this.cover = covers[index]; // Set cover
        
        let rawTitle = albumInv.getString(index, 1); // Get title from albums.csv
        // Remove special characters used for API calls in setup script
        rawTitle = rawTitle.replaceAll('`', '');
        rawTitle = rawTitle.replaceAll('^', '');
        this.title = rawTitle; // Set title

        let avgColour = this.calcAvgCol() // Gets array with cover's average colour in HSL
        // Values for average hue, saturation and lightness are set here.
        this.avgHue = avgColour[0];
        this.avgSat = avgColour[1];
        this.avgLight = avgColour[2];
    }

    // Calculates cover's average colour, returns array with values in HSL
    calcAvgCol() {
        this.cover.loadPixels(); // Loads pixels from image
        let pix = this.cover.pixels; // reference to pixels

        // Initialising variables to keep track of hsl totals for avg calculation
        let saturations = 0;
        let lightnesses = 0;
        // Hue is different as it's not a linear value from 1 - 100, but a degree on a circle
        // These angles can be seen as vectors on a unit circle though
        // The average vector of these, turned back into an angle, is then the answer I'm lookinn for
        let hues = createVector(0, 0);

        for (let i = 0; i < (pix.length / 4); i++) { // runs once per pixel
            let r = pix[i*4]; // gets red value
            let g = pix[i*4+1]; // gets green value
            let b = pix[i*4+2]; // gets blue value
            let pixCol = color(r, g, b); // creating a colour object from rgb values. This is done so the HSL values can be calculated from the RGB values providede by the .pixels array

            lightnesses += lightness(pixCol); // Adds lightness of current pixel
            if (lightness(pixCol) > 5 && lightness(pixCol) < 95) { // If pixel isn't black or white,
                hues.add(createVector(cos(hue(pixCol)), sin(hue(pixCol)))) // Adds hue of current pixel
                saturations += saturation(pixCol); // Adds saturation of current pixel

                // The saturation and hue of black and white pixels aren't considered in the average so that in covers with bright coloured objects and imperceptibly coloured black or white backgrounds, the backgrounds don't impact the calculation
                // This is also done for saturation so that when varying position along saturation, similarly imperceptibly saturated blacks and whites don't place mostly black and white images in the more saturated parts of the circle
            }
        }

        // I don't fully understand the math here, ie. how atan2 gets the angle of the sum of the vectors
        // This is where I got it from though: https://www.themathdoctors.org/averaging-angles/
        let avgHue = atan2(hues.y, hues.x); 
        if (avgHue < 0) {avgHue += 360;} // atan2 returns an angle from -180 to 180, so this wraps the negative values back around
        let avgSat = saturations / (pix.length / 4); // Calculating average saturation
        let avgLight = lightnesses / (pix.length / 4); // Calculating average lightness
        return [avgHue, avgSat, avgLight]; // Return colour
    }
}

/* Ahead is code I wrote for extra features.
It is neither finished nor completed, but I'm leaving it here in case I want to return to this project later.
More details on the features in the readme file!
*/

// let hist; // Variable to contain listening history
// hist = loadTable('assets/listen-history.csv'); // Load listening history

// function setup() {
//     let pastDay = hist.getString(0, 0).slice(0, 11)
//     let dayDiff = 0;
//     let albums = [];
//     for (let i = 0; i < 1567; i++) {
//         let currDay = hist.getString(i, 3).slice(0, 11);

//         let currAlbum = hist.getString(i, 1);
//         let unique = true;
//         for (let j = 0; j < albums.length; j++) {
//             if (currAlbum == albumsss[j].title) {
//                 unique = false;
//                 albumsss[j].count++;
//             }
//         }
//         if (unique) {
//             let index = 0;
//             for (let j = 0; j < albumInv.getRowCount(); j++) {
//                 let titleTable = albumInv.getString(j, 1)
//                 titleTable = titleTable.replaceAll('`', '');
//                 titleTable = titleTable.replaceAll('^', '');
//                 if (titleTable == currAlbum) {
//                     index = j;
//                     break;
//                 }
//             }
//             albums.push( {title: currAlbum, count: 0, coverIndex: index} );
//         }

//         if (currDay != pastDay) { dayDiff++; } 
//         // if (dayDiff = 7) {

//         // }
//     }

//     // for (let i = 0; i < albumsss.length; i++) {
//     //     let cover = albums[albumsss[i].coverIndex];
//     //     //console.log(albumsss[i]);
//     //     let x = 0;
//     //     let y = 0;
//     //     if (cover.sat > 6) {
//     //         x = map(cover.hue, 0, 360, 34, width) - 34;
//     //         y = random((height - height/5) -84);
//     //     } else {
//     //         x = map(cover.light, 0, 100, 34, width) - 34;
//     //         y = random((height - height/5) - 34, height-34);
//     //     }
//     //     for (let j = 0; j < albumsss[i].count; j++) {
//     //         image(cover.img, x + random(-20, 20), y + random(-20, 20));
//     //     }
//     // }
//     //console.log(albums[1]);
// }