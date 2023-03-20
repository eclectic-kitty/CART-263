/*
Ideas for visualisation
#1: Sound wave
Arrange covers as a sound wave, each line is a week, top is brighter coloured, lower is darker coloured

*/

let covers = [];
let hist;
let albumTable

let colCount = 0;
let rowCount = 0;

function preload() {
    for (i = 0; i < 1500; i++) { // If just displaying covers, period, = 1499, < -1, i--
        let path = 'assets/images/' + i + '.png';
        let cover = {img: loadImage(path), hue: 0, sat: 0, light: 0};
        covers.push(cover);
    }
    hist = loadTable('assets/listen-history.csv');
    albumTable = loadTable('assets/albums.csv');
}

function setup() {
    angleMode(DEGREES);
    createCanvas(800, 300);
    background(175);
    // for (i = 0; i < covers.length; i++) {
    //     covers[i].loadPixels();
    //     let pix = covers[i].pixels;
    //     for (j = 0; j < (pix.length/4); j++)
    //     covers[i].pixels
    // }
    for (i = 0; i < covers.length; i++) {
        covers[i].img.loadPixels();
        let pix = covers[i].img.pixels;

        let hues = createVector(0, 0);
        let saturations = 0;
        let lightnesses = 0;

        let reds = 0;
        let greens = 0;
        let blues = 0;

        for (j = 0; j < (pix.length / 4); j++) {
            let r = pix[j*4];
            let g = pix[j*4+1];
            let b = pix[j*4+2];
            let pixCol = color(r, g, b);

            lightnesses += round(lightness(pixCol));
            //saturations += round(saturation(pixCol)); // For displaying by saturation
            if (lightness(pixCol) > 10 && lightness(pixCol) < 90) {
                angle = round(hue(pixCol));
                hues.add(createVector(cos(angle), sin(angle)))

                saturations += round(saturation(pixCol)); // For displaying by hue
            }
        }
        let avgHue = atan2(hues.y, hues.x);
        if (avgHue < 0) {avgHue += 360;39290}
        let avgSat = saturations / (pix.length / 4);
        let avgLight = lightnesses / (pix.length / 4);
        covers[i].hue = avgHue;
        covers[i].sat = avgSat;
        covers[i].light = avgLight;
        //console.log(albums.getString(i, 1) + ' - ' + covers[i].hue + ', ' + covers[i].sat + ', ' + covers[i].light);

        //Displaying by hue
        // if (covers[i].sat < 6) { // && (covers[i].light < 10 || covers[i].light > 90)
        //     image(covers[i].img, map(covers[i].light, 0, 100, 34, width) - 34, random((height - height/5) - 34, height-34));
        // } else {
        //     image(covers[i].img, map(covers[i].hue, 0, 360, 34, width) - 34, random((height - height/5) -84));
        // }

        // Displaying by saturation or lightness
        //image(covers[i].img, map(covers[i].light, 0, 100, 34, width) - 34, random(height-34));

        // colCount++;
        // if (colCount > 9) {
        //     rowCount++;
        //     colCount = 0;
        // }
    }

    let pastDay = hist.getString(0, 0).slice(0, 11)
    let dayDiff = 0;
    let albums = [];
    for (i = 0; i < 1567; i++) {
        let currDay = hist.getString(i, 3).slice(0, 11);

        let currAlbum = hist.getString(i, 1);
        let unique = true;
        for (j = 0; j < albums.length; j++) {
            if (currAlbum == albums[j].title) {
                unique = false;
                albums[j].count++;
            }
        }
        if (unique) {
            let index = 0;
            for (j = 0; j < albumTable.getRowCount(); j++) {
                let titleTable = albumTable.getString(j, 1)
                titleTable = titleTable.replaceAll('`', '');
                titleTable = titleTable.replaceAll('^', '');
                if (titleTable == currAlbum) {
                    index = j;
                    break;
                }
            }
            albums.push( {title: currAlbum, count: 0, coverIndex: index} );
        }

        if (currDay != pastDay) { dayDiff++; } 
        // if (dayDiff = 7) {

        // }
    }

    for (i = 0; i < albums.length; i++) {
        let cover = covers[albums[i].coverIndex];
        //console.log(albums[i]);
        let x = 0;
        let y = 0;
        if (cover.sat > 6) {
            x = map(cover.hue, 0, 360, 34, width) - 34;
            y = random((height - height/5) -84);
        } else {
            x = map(cover.light, 0, 100, 34, width) - 34;
            y = random((height - height/5) - 34, height-34);
        }
        for (j = 0; j < albums[i].count; j++) {
            image(cover.img, x + random(-20, 20), y + random(-20, 20));
        }
    }
    //console.log(covers[1]);
}