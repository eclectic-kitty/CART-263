/*
Ideas for visualisation
#1: Sound wave
Arrange covers as a sound wave, each line is a week, top is brighter coloured, lower is darker coloured

*/

let covers = [];
let hist;
let albumInv

function preload() {
    hist = loadTable('assets/listen-history.csv');
    albumInv = loadTable('assets/albums.csv');
}

function setup() {
    console.log(covers);

    for (i = 0; i < 1500; i++) { // If just displaying covers, period, = 1499, < -1, i--
        let album = new Album(i);
        console.log(album);
        covers.push(album);
    }
}

// function setup() {
//     angleMode(DEGREES);
//     createCanvas(1500, 700);
//     background(175);
  
//     // for (i = 0; i < covers.length; i++) {
//     //     covers[i].loadPixels();
//     //     let pix = covers[i].pixels;
//     //     for (j = 0; j < (pix.length/4); j++)
//     //     covers[i].pixels
//     // }
//     for (i = 0; i < covers.length; i++) {
//         covers[i].img.loadPixels(); // Loads pixels from image
//         let pix = covers[i].img.pixels; // reference to pixels

//         // Initialising variables to keep track of value totals for avg calculation
//         let hues = createVector(0, 0); // hues has to be a vector for math reasons
//         let saturations = 0;
//         let lightnesses = 0;

//         for (j = 0; j < (pix.length / 4); j++) { // per pixel
//             let r = pix[j*4]; // gets red value
//             let g = pix[j*4+1]; // gets green value
//             let b = pix[j*4+2]; // gets blue value
//             let pixCol = color(r, g, b); // creates colour from them

//             lightnesses += round(lightness(pixCol)); // Adds together lightnesses
//             saturations += round(saturation(pixCol)); // Adds together saturations for displaying by saturation
//             if (lightness(pixCol) > 10 && lightness(pixCol) < 90) {
//                 angle = round(hue(pixCol));
//                 hues.add(createVector(cos(angle), sin(angle)))

//                 //saturations += round(saturation(pixCol)); // For displaying by hue
//             }
//         }
//         let avgHue = atan2(hues.y, hues.x);
//         if (avgHue < 0) {avgHue += 360;39290}
//         let avgSat = saturations / (pix.length / 4);
//         let avgLight = lightnesses / (pix.length / 4);
//         covers[i].hue = avgHue;
//         covers[i].sat = avgSat;
//         covers[i].light = avgLight;
//         //console.log(albums.getString(i, 1) + ' - ' + covers[i].hue + ', ' + covers[i].sat + ', ' + covers[i].light);

//         //Displaying by hue
//         // if (covers[i].sat < 6) { // && (covers[i].light < 10 || covers[i].light > 90)
//         //     image(covers[i].img, map(covers[i].light, 0, 100, 34, width) - 34, random((height - height/5) - 34, height-34));
//         // } else {
//         //     image(covers[i].img, map(covers[i].hue, 0, 360, 34, width) - 34, random((height - height/5) -84));
//         // }

//         // Displaying by saturation or lightness
//         image(covers[i].img, map(covers[i].sat, 0, 100, 34, width) - 34, random(height-34));
//     }

//     let pastDay = hist.getString(0, 0).slice(0, 11)
//     let dayDiff = 0;
//     let albums = [];
//     for (i = 0; i < 1567; i++) {
//         let currDay = hist.getString(i, 3).slice(0, 11);

//         let currAlbum = hist.getString(i, 1);
//         let unique = true;
//         for (j = 0; j < albums.length; j++) {
//             if (currAlbum == albums[j].title) {
//                 unique = false;
//                 albums[j].count++;
//             }
//         }
//         if (unique) {
//             let index = 0;
//             for (j = 0; j < albumInv.getRowCount(); j++) {
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

//     // for (i = 0; i < albums.length; i++) {
//     //     let cover = covers[albums[i].coverIndex];
//     //     //console.log(albums[i]);
//     //     let x = 0;
//     //     let y = 0;
//     //     if (cover.sat > 6) {
//     //         x = map(cover.hue, 0, 360, 34, width) - 34;
//     //         y = random((height - height/5) -84);
//     //     } else {
//     //         x = map(cover.light, 0, 100, 34, width) - 34;
//     //         y = random((height - height/5) - 34, height-34);
//     //     }
//     //     for (j = 0; j < albums[i].count; j++) {
//     //         image(cover.img, x + random(-20, 20), y + random(-20, 20));
//     //     }
//     // }
//     //console.log(covers[1]);
// }

class Album {
    constructor(index) {
        let path = 'assets/images/' + index + '.png';
        this.cover = loadImage(path);
        
        let rawTitle = albumInv.getString(index, 1)
        rawTitle = rawTitle.replaceAll('`', '');
        rawTitle = rawTitle.replaceAll('^', '');
        this.title = rawTitle;

        this.avgColour = this.calcAvgCol();
    }

    calcAvgCol() {
        return 3;
    }
}