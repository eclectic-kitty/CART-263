// My API key: fc29072d5368e2cf9e7b26a7b59da0f6
// API URL: http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + + "&album=" + + "&format=json"

let hist;
let test2;
let covers;
let row = 226;

let artist;
let album;
let test;


function preload() {
    hist = loadTable("assets/listen-history.csv", "csv");
}

function setup() {
    createCanvas(500, 500);
    background(245, 245, 255);

    let preArtist = hist.getString(row, 0);
    let splitArtist = split(preArtist, " ");
    artist = join(splitArtist, "%20");

    let preAlbum = hist.getString(row, 1);
    let splitAlbum = split(preAlbum, " ");
    album = join(splitAlbum, "%20");

    let url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + artist + "&album=" + album + "&format=json";
    test = loadJSON(url, boop);
    //console.log(test);

    //let cover = test.album;

}

function boop (blep) {
    let imgPath = blep.album.image[3]
    imgPath = imgPath['#text'];

    if (imgPath) {
        console.log('hurray!');
    } else {
        console.log('womp womp');
    }

    loadImage(imgPath, dap)

    console.log(blep)
    console.log(blep.album.image[3]);
    // ack = blep.album.image[3];
    // console.log(ack['#text']);
}

function dap (doop) {
    image(doop, 0, 0);
    console.log(doop);
}

function womp () {
    console.log('womp womp');
}