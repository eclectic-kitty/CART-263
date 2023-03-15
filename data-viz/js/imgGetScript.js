// My API key: fc29072d5368e2cf9e7b26a7b59da0f6
// API URL: http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + + "&album=" + + "&format=json"

let hist;
let covers = [];
//let row = 226;

let artist;
let album;
let imgSize = 0;
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
    createCanvas(1020, 1020);
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
    // let splitArtist = split(artist, " ");
    // for (i = 0; i < splitArtist.length; i++) {
    //     if (splitArtist[i] == '&') {splitArtist[i] = '%26';}
    //     if (splitArtist[i] == '+') {splitArtist[i] = '%2B';}
    //     if (splitArtist[i] == '`') {splitArtist[i] = ',';}
    // }
    // let urlArtist = join(splitArtist, "%20");
    let urlArtist = artist.replaceAll('&', '%26');
    urlArtist = urlArtist.replaceAll('+', '%2B');
    urlArtist = urlArtist.replaceAll('`', ',');

    album = hist.getString(albumCount, 1);
    // let splitAlbum = split(album, " ");
    // for (i = 0; i < splitAlbum.length; i++) {
    //     if (splitAlbum[i] == '&') {splitAlbum[i] = '%26';}
    //     if (splitAlbum[i] == '+') {splitAlbum[i] = '%2B';}
    //     if (splitAlbum[i] == '`') {splitAlbum[i] = ',';}
    // }
    // let urlAlbum = join(splitAlbum, "%20");
    let urlAlbum = album.replaceAll('&', '%26');
    urlAlbum = urlAlbum.replaceAll('+', '%2B');
    urlAlbum = urlAlbum.replaceAll('`', ',');

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

    image(cover, displRowCount * 34, colCounter * 34);
    displRowCount++;
    if (displRowCount > 29) {
        colCounter++;
        displRowCount = 0;
    }

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