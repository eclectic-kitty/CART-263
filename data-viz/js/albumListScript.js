let hist;
let albums = [];
let albumsTable
let numRows;

function preload() {
    hist = loadTable('assets/listen-history.csv', 'csv');
    albumsTable = new p5.Table()
    albumsTable.addColumn();
    albumsTable.addColumn();
}

function setup() {


    numRows = hist.getRowCount();

    for (r = 0; r < numRows; r++) {
        //, hist.getString(r, 3)
        let currAlbum = [hist.getString(r, 0), hist.getString(r, 1)]; //currAlbum array contains [artist, album]

        for (i = 0; i < albums.length; i++) {
            if (currAlbum[1] == albums[i][1]) { // currAlbum[0] == albums[i][0] && currAlbum[1] == albums[i][1
                currAlbum = 0;
            }
        }

        if (currAlbum) {
            //console.log('yo');
            let albumRow = albumsTable.addRow()
            for (i = 0; i < currAlbum.length; i++) {
                albumRow.set(i, currAlbum[i]);
            }
            currAlbum.push(albums.length);
            albums.push(currAlbum);
        }
    }
    console.log(albums);
    console.log(albumsTable);
    text('ready!', 10, 10);
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

// DID NOT WORK, MADE IT CRASH WHEN IT GOT TO THE THIRD ALBUM // EDIT: fixed
// Couldn't figure out why, but whenever it started comparing a third album against two existing ones in the list,
// it began to endlessly loop the for loop outside the if, even though albums.length did not increase past 2
// heavily simplified from top answer on https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// LATER: Ok, I figured it out a little bit more. I was using i for the for loop in here, which I was also using for
// the other for loop. Not going to follow th elogic past that tbh.
// Stopped working again later? Never returned true
function sameArray(a, b) {
    for (j = 0; j < b.length; j++) {
        if (a[j] != b[j]) {
            return false;
        }
    }
    return true;
}

// sameArray(currAlbum, albums[i])