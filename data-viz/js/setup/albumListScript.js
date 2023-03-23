/* Script for listing the albums from my listening history
This list can then be downloaded as a csv file by clicking on the canvas
*/

let hist; // Variable to hold listening history table
//let albums = []; // Array to hold list of albums
let albumsTable; // Variable to hold table that will be outputted

function preload() {
    hist = loadTable('assets/listen-history.csv', 'csv'); // Loads the listening history table
    albumsTable = new p5.Table() // Creates the output table
    for (i=0;i<2;i++) {albumsTable.addColumn();} // Creates the table's two columns
}

// As the script only needs to run one, I run it all in setup
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Runs once per row in listening history table
    for (r = 0; r < hist.getRowCount(); r++) {
        let currAlbum = [hist.getString(r, 0), hist.getString(r, 1)]; // Records current row's artist and album in an array

        // Runs once per row in output table
        for (i = 0; i < albumsTable.getRowCount(); i++) {
            // Checks if current album is already listed in output table
            if (currAlbum[1] == albumsTable.getString(i, 1)) { 
                currAlbum = 0; // If it is, currAlbum is written over with 0
            }
        }

        // If currAlbum is truthy, ie. still contains text
        if (currAlbum) {
            let albumRow = albumsTable.addRow() // Creates new row in output table
            // Adds artist and album to new row
            for (i = 0; i < currAlbum.length; i++) {
                albumRow.set(i, currAlbum[i]);
            }
        }
    }

    textAlign(CENTER); // Aligns text to center
    fill(255); // Sets text colour to white
    text('Ready! Click to download!', width/2, height/2); // Tells user table is ready to dowload
}

// Downloads table on click
function mouseClicked() {
    save(albumsTable, 'albums.csv');
}

// It's working, mostly. I am admittedly concerned about the albums with artist listed being song artist, not album artist.
// Aside from Hadestown and In the Heights, I also noticed Tiny Changes, some Sonos fuckery, Some Kind of Peace (piano), 
// Tchaikovsky, Transformers, some just missing an album title, LUMP, Celeste B-Sides, boygenius, Arcane, Carrie, 
// Devinyl Splits, God has nothing to do with this..., Give Up bonus tracks, etc.

// Also, wouuuuld like to get rid of the array and just check in the table, but not too important
// This script is only meant to run once in a while, anyways.

// Discrepancy in number of albums when including only albums with unique name vs albums with unique name and unique artist
// The latter includes about 100 more, at least some come from musicals, where the song artist name != album artist name
// some might also come from singles with same name as album
// However, with the former, I'm undercounting some 40 albums. 
// My guess is the singles? Perhaps the odd album with the same name?
// this has been figured out, see above