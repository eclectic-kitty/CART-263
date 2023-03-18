let covers = [];
let hist;

let colCount = 0;
let rowCount = 0;

function preload() {
    for (i = 0; i < 1500; i++) {
        let path = 'assets/images/' + i + '.png';
        let cover = loadImage(path);
        covers.push(cover);
    }
    hist = loadTable('assets/listen-history.csv');
}

function setup() {
    createCanvas(340, 340);
    // for (i = 0; i < covers.length; i++) {
    //     covers[i].loadPixels();
    //     let pix = covers[i].pixels;
    //     for (j = 0; j < (pix.length/4); j++)
    //     covers[i].pixels
    // }
    covers[0].loadPixels();
    let pix = covers[0].pixels;
    let newPix = [];
    for (j = 0; j < (pix.length/4); j++) {
        let r = pix[j*4];
        let g = pix[j*4+1];
        let b = pix[j*4+2];
        let pixCol = color(r, g, b);

        newPix.push(round(hue(pixCol)));
        newPix.push(round(saturation(pixCol)));
        newPix.push(round(lightness(pixCol)));

    }
    console.log(covers[0].pixels)
    console.log(newPix);
    let c = (color(20, 11, 14));
    console.log(hue(c), saturation(c), lightness(c));
}