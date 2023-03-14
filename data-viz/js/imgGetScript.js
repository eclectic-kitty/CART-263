// My API key: fc29072d5368e2cf9e7b26a7b59da0f6
// API URL: http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + + "&album=" + + "&format=json"

let hist;
let test2;
let covers = [];
//let row = 226;

let artist;
let album;
let test;
let imgSize = 1;
let albumNum = 1500;

let albumCount = 0;
let colCounter = 0;
let displRowCount = 0;

let ready = true;
let done = false;


function preload() {
    hist = loadTable("assets/albums.csv", "csv");
}

function setup() {
    frameRate(60);
    createCanvas(510, 510);
    background(245, 245, 255);
}

function draw() {
    if (ready && albumCount < albumNum) {
        //console.log("getting album");
        getAlbumJSON();
    } else if (albumCount == albumNum && !done) {
        console.log("done!");
        done = true;
    }
}

function getAlbumJSON () {
    ready = false;

    artist = hist.getString(albumCount, 0);
    let splitArtist = split(artist, " ");
    for (i = 0; i < splitArtist.length; i++) {
        if (splitArtist[i] == '&') {splitArtist[i] = '%26amp;';}
    }
    let urlArtist = join(splitArtist, "%20");

    album = hist.getString(albumCount, 1);
    let splitAlbum = split(album, " ");
    for (i = 0; i < splitAlbum.length; i++) {
        if (splitAlbum[i] == '&') {splitAlbum[i] = '%26amp;';}
    }
    let urlAlbum = join(splitAlbum, "%20");

    let url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + urlArtist + "&album=" + urlAlbum + "&format=json";
    loadJSON(url, preparePath, wompWomp);
}

function preparePath (albumJSON) {
    let imgPath = albumJSON.album.image[imgSize]
    imgPath = imgPath['#text'];

    if (imgPath) {
        loadImage(imgPath, downloadCover);
    } else {
        wompWomp();
    }
}

function downloadCover (cover) {
    covers.push(album);
    covers.push(cover);

    albumCount++;
    // image(cover, displRowCount * 64, colCounter * 64);
    // displRowCount++;
    // if (displRowCount > 7) {
    //     colCounter++;
    //     displRowCount = 0;
    // }
    ready = true;
    //getAlbumJSON();
}

function wompWomp () {
    //loadImage('assets/images/clown.png', displayCover);
    console.log('womp womp');
    console.log(artist + " - " + album);
    albumCount++;
    ready = true;
}

function mouseClicked() {
    console.log(covers);
}