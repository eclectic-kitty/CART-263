/* Script for fetching album covers from last.fm
Once script is finished, the covers are all displayed in the canvas, which can be downloaded by clicking on the canvas
Script takes at least a few minutes to run, as the API calls & donwloading the images takes a little while
I've set it to only download 1500 covers at the time, as that is roughly the amount I've listened to in the past year
*/

let albumList; // variable to hold table with list of albums

let artist; // variable to hold current artist
let album; // variable to hold current album
const imgSize = 0; // constant for size of image to download, 0 is for the smallest, size will be 34 x 34 pixels
let albumCount = 0; // variable used as index for current album
const albumCountEnd = 1500; // constant for what index to fetch until
const albumTotal = albumCountEnd - albumCount; // constant for total amount of covers to fetch

let colIndex = 0; // column index variable for displaying covers
let rowIndex = 0; // row index variable for displaying covers

let ready = true; // boolean to control when ready to start fetching next album cover
let done = false; // boolean to signal when all covers have ben downloaded


function preload() {
    albumList = loadTable("assets/albums.csv", "csv"); // Loads table with lsit of albums
}

function setup() {
    let canvasSide = ceil(sqrt(albumTotal)) * 34; // Calculates length of canvas sides from number of covers that will be fetched
    createCanvas(canvasSide, canvasSide); // Canvas size is currently set to the product of 34 and 23 as 34 x 23 is the size of the images and the product of 23 with itself is closest to 500 without going under. 
    background(63, 127, 74); // Set to green as it's a recognizable colour, making it easier to replace with transparent pngs later
}

function draw() {
    if (ready && albumCount < albumCountEnd) { // If ready for next album & not over the number I want to fetch,
        getAlbumJSON(); // Starts fetching process by calling function that gets a given album's JSON from last.fm
    } else if (albumCount == albumCountEnd && !done) { // If we've reached the number of covers I want to fetch and done remains false,
        console.log("Done! Clcik anywhere to download!"); // Alerts user via console process is done
        done = true; // Sets done signal boolean to true
    }
}

// Gets the JSON for a given album from last.fm
function getAlbumJSON () {
    ready = false; // Sets ready variable to false to prevent multiple covers from being fetched simultaneously

    // Prepares artist name string for API call
    artist = albumList.getString(albumCount, 0); // Records artist name from table
    let urlArtist = artist.replaceAll('&', '%26'); // Encodes & for the API URL
    urlArtist = urlArtist.replaceAll('+', '%2B'); // Encodes + for the API URL
    urlArtist = urlArtist.replaceAll('`', ','); // Adds commas to artist names that require it
    urlArtist = urlArtist.replaceAll('^', '"'); // Adds quotation marks to artist names that need it

    album = albumList.getString(albumCount, 1);
    let urlAlbum = album.replaceAll('&', '%26'); // Encodes & for the API URL
    urlAlbum = urlAlbum.replaceAll('+', '%2B'); // Encodes + for the API URL
    urlAlbum = urlAlbum.replaceAll('`', ','); // Adds commas to album names that require it
    urlAlbum = urlAlbum.replaceAll('^', '"'); // Adds quotation marks to album names that need it
    urlAlbum = urlAlbum.replaceAll('#', '%23'); // Encodes # for the API URL

    // Adds artist and album name to the url for API call
    let url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fc29072d5368e2cf9e7b26a7b59da0f6&artist=" + urlArtist + "&album=" + urlAlbum + "&format=json";
    loadJSON(url, getCover, wompWomp); // Loads JSON object from the API URL call
    // As loadJSON runs asynchronously from following lines, I am using the callback functions to run the following code.
}

// Loads image from the JSON fetched in getAlbumJSON()
function getCover (albumJSON) {
    let imgPath = albumJSON.album.image[imgSize]['#text'] // Gets URL to image from JSON


    if (imgPath) { // If the path isn't empty
        loadImage(imgPath, displayCover); // Loads the image from the path
        // Again, loadImage runs asynchronously, so I'm using the callback function
    } else { // If the path is empty
        wompWomp(); // Calls wompWomp()
    }
}

//Displays album cover fetched in getCover()
function displayCover (cover) {
    image(cover, colIndex * 34, rowIndex * 34); // Draws album cover on canvas
    colIndex++; // Increases the column index fro the next cover
    if (colIndex > floor(sqrt(albumTotal))) { // Once the maximum amount of covers on one line has been drawn,  
        rowIndex++; // Row index is increased
        colIndex = 0; // and column index is reset
    }

    albumCount++; // Increases index for next album
    ready = true; // Signals that next cover can be fetched
}

// Function that is called when a cover can't be fetched
function wompWomp () {
    loadImage('assets/images/womp.png', displayCover); // Calls displayCover() and passes it a transparent image
    // It will be displayed as the background colour, allowing it to be easily identified, but maintaining the index of the other covers
    console.log('womp womp, ' + artist + " - " + album); // Alerts user of the error via the console & logs the name of the album that failed
}

// Downloads the canvas on a mouse click if done
function mouseClicked() {
    if (done) {
        saveCanvas('covers', 'png');
    }
}