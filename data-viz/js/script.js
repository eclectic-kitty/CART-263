let hist;
let albums = [];
let numRows = 39474;

function preload() {
    hist = loadTable('assets/listen-history.csv', 'csv');
}

function setup() {

    for (r = 0; r < numRows; r++) {
        let currAlbum = [hist.getString(r, 0), hist.getString(r, 1)]; //currAlbum array contains [artist, album]

        for (i = 0; i < albums.length; i++) {
            if (currAlbum[1] == albums[i][1]) { // currAlbum[0] == albums[i][0] && currAlbum[1] == albums[i][1
                currAlbum = 0;
            }
        }

        if (currAlbum) {
            albums.push(currAlbum)
        }
    }
    console.log(albums);
}

// Discrepancy in number of albums when including only albums with unique name vs albums with unique name and unique artist
// The latter includes about 100 more, at least some come from musicals, where the song artist name != album artist name
// some might also come from singles with same name as album
// However, with the former, I'm undercounting some 40 albums. 
// My guess is the singles? Perhaps the odd album with the same name?

// DID NOT WORK, MADE IT CRASH WHEN IT GOT TO THE THIRD ALBUM
// Couldn't figure out why, but whenever it started comparing a third album against two existing ones in the list,
// it began to endlessly loop the for loop outside the if, even though albums.length did not increase past 2
// heavily simplified from top answer on https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
function sameArray(a, b) {
    for (i = 0; i < b.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

// sameArray(currAlbum, albums[i])