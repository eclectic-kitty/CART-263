/*
Ideas for visualisation
#1: Sound wave
Arrange covers as a sound wave, each line is a week, top is brighter coloured, lower is darker coloured

*/

let albums = []; // Array to contain album objects
let hist; // Variable to contain listening history
let albumInv; // Variable to contain albums index
let covers = []; // Array to contain cover images

let colIndex = 0; // column index variable for displaying covers
let rowIndex = 0; // row index variable for displaying covers

function preload() {
    hist = loadTable('assets/listen-history.csv'); // Load listening history
    albumInv = loadTable('assets/albums.csv'); // Load albums index

    // Load cover images
    for (let i = 0; i < 1500; i++) {
        let path = 'assets/images/covers/' + i + '.png';
        let cover = loadImage(path);  
        covers.push(cover);
    }
}

function setup() {
    createCanvas(340, 340);
    background(0);
    angleMode(DEGREES); // This is for calculating hue averages

    // Create album objects
    for (let i = 0; i < 1500; i++) {
        let album = new Album(i); // Index is passed along to get cover image & title
        console.log(album);
        albums.push(album);
    }
}

// function setup() {

//         //Displaying by hue
//         // if (albums[i].sat < 6) { // && (albums[i].light < 10 || albums[i].light > 90)
//         //     image(albums[i].img, map(albums[i].light, 0, 100, 34, width) - 34, random((height - height/5) - 34, height-34));
//         // } else {
//         //     image(albums[i].img, map(albums[i].hue, 0, 360, 34, width) - 34, random((height - height/5) -84));
//         // }

//         // Displaying by saturation or lightness
//         image(albums[i].img, map(albums[i].sat, 0, 100, 34, width) - 34, random(height-34));
//     }

//     let pastDay = hist.getString(0, 0).slice(0, 11)
//     let dayDiff = 0;
//     let albumsss = [];
//     for (let i = 0; i < 1567; i++) {
//         let currDay = hist.getString(i, 3).slice(0, 11);

//         let currAlbum = hist.getString(i, 1);
//         let unique = true;
//         for (let j = 0; j < albumsss.length; j++) {
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
//             albumsss.push( {title: currAlbum, count: 0, coverIndex: index} );
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

class Album {
    constructor(index) {
        this.cover = covers[index];
        
        let rawTitle = albumInv.getString(index, 1)
        // Remove special characters used for API calls in setup script
        rawTitle = rawTitle.replaceAll('`', '');
        rawTitle = rawTitle.replaceAll('^', '');
        this.title = rawTitle;

        let avgColour = this.calcAvgCol() // gets average colour array
        this.avgHue = avgColour[0];
        this.avgSat = avgColour[1];
        this.avgLight = avgColour[2];
    }

    // Calculates cover's average colour, returns array with hsl values
    calcAvgCol() {
        this.cover.loadPixels(); // Loads pixels from image
        let pix = this.cover.pixels; // reference to pixels
        //console.log(pix);

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
            let pixCol = color(r, g, b); // creating a colour object from rgb values

            lightnesses += lightness(pixCol); // Adds lightness of current pixel
            //saturations += round(saturation(pixCol)); // Adds together saturations for displaying by saturation
            if (lightness(pixCol) > 10 && lightness(pixCol) < 90) { // If pixel isn't black or white
                hues.add(createVector(cos(hue(pixCol)), sin(hue(pixCol)))) // Adds hue of current pixel
                saturations += saturation(pixCol); // Adds saturation of current pixel
            }
        }
        // I don't fully understand the math here, ie. how atan2 gets the angle of the sum of the vectors
        // This is where I got it from though: 
        let avgHue = atan2(hues.y, hues.x); 
        if (avgHue < 0) {avgHue += 360;} // atan2 returns an angle from -180 to 180, so this wraps the negative values back around
        let avgSat = saturations / (pix.length / 4); // Calculating average saturation
        let avgLight = lightnesses / (pix.length / 4); // Calculating average lightness
        return [avgHue, avgSat, avgLight];
    }
}