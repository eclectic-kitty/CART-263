// My API key: fc29072d5368e2cf9e7b26a7b59da0f6
// API URL: http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + + "&album=" + + "&format=json"

let hist;

let artist;
let album;
let imgSize = 0;
let albumNum = 1500;
let albumCount = 1000;

let colCount = 0;
let rowCount = 0;

let ready = true;
let done = false;
let downloaded = false;


function preload() {
    hist = loadTable("assets/albums.csv", "csv");
}

function setup() {
    frameRate(60);
    createCanvas(782, 782);
    background(63, 127, 74);
}

function draw() {
    if (ready && albumCount < albumNum) {
        getAlbumJSON();
    } else if (albumCount == albumNum && !done) {
        console.log("done!");
        done = true;
    } else if (done && !downloaded) {
        saveCanvas('covers', 'png');
        downloaded = true;
     }
}

function getAlbumJSON () {
    ready = false;

    artist = hist.getString(albumCount, 0);
    let urlArtist = artist.replaceAll('&', '%26');
    urlArtist = urlArtist.replaceAll('+', '%2B');
    urlArtist = urlArtist.replaceAll('`', ',');
    urlArtist = urlArtist.replaceAll('^', '"');

    album = hist.getString(albumCount, 1);
    let urlAlbum = album.replaceAll('&', '%26');
    urlAlbum = urlAlbum.replaceAll('+', '%2B');
    urlAlbum = urlAlbum.replaceAll('`', ',');
    urlAlbum = urlAlbum.replaceAll('^', '"');
    urlAlbum = urlAlbum.replaceAll('#', '%23');

    let url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + urlArtist + "&album=" + urlAlbum + "&format=json";
    loadJSON(url, preparePath, wompWomp);
}

function preparePath (albumJSON) {
    let imgPath = albumJSON.album.image[imgSize]
    imgPath = imgPath['#text'];

    if (imgPath) {
        loadImage(imgPath, displayCover);
    } else {
        wompWomp();
    }
}

function displayCover (cover) {
    albumCount++;

    image(cover, colCount * 34, rowCount * 34);
    colCount++;
    if (colCount > 22) {
        rowCount++;
        colCount = 0;
    }

    ready = true;
    //getAlbumJSON();
}

function wompWomp () {
    loadImage('assets/images/womp.png', displayCover);
    console.log('womp womp');
    console.log(artist + " - " + album);
}

function mouseClicked() {
    console.log(covers);
}