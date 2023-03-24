# Setup Instructions

If you want to generate the visualisation from a new set of covers, here is how I did it
- First off, I got my listening history as a CSV file from https://benjaminbenben.com/lastfm-to-csv/ 
- Once downloaded, name it listening-history.csv and place it in /assets
- In index.html, comment out line 19 and uncomment line 21 to make the project run albumListScript.js.
- This script will create and download a list of all the albums in the listening history. Run the project.
- Name the file downloaded albums.csv and place it in /assets.
- Next, in imgGetScript.js, change the constant albumCountEnd to whatever number you want. This will be the number of covers downloaded.
- Comment line 21 in index.html and uncomment line 22 to make the project run imgGetScript.js.
- This script will download all the covers of the albums in albums.csv as a grid. Run the project again
- Note that some albums fail and will display green squares for a few different reasons and may require manual fixes. To facilitate this, the imgGet Script logs in the console whenever a cover fails to download, along with the title and artist name. The reasons I noticed for failures are as follows:
    - Listening history csv file from earlier doesn't include commas in album titles or artist names. This is because commas are already used to separate values. I had to manually add backtics (`) in albums.csv wherever a comma is meant to be present, which the imgGetScript.js can interpret and replace with a comma before calling the Last.fm API.  
    - The same above can happen with quotation marks in titles or names because of them being interpreted as strings. These can be replaced with ^, which imgGetScript.js can also interpret appropriately.
    - Some tracks have artists that are different from that of the album in the listening-history CSV file. I found this happened to me mostly with musicals. This can be fixed by manually changing the artist name in albums.csv and deleting the multiple copies of the album.
    - Finally, with obscure albums, Last.fm might just not have the cover. For this the only fix is to replace the cover or add it to Last.FM before running the script again.
- Now that you have your downloaded grid of album covers, they need to be separated. I did this using GIMP and a couple of extensions called "ofn-layer-tiles" and "Export Layer". Once installed, refer to the the ofn-layer-tiles documentation, which will explain how to separate the grid. Do make sure to use the tileRC0 option in the Tile Name parameter when exporting the tiles. This names them sequentially. You can get GIMP and the three extensions here:
    - https://www.gimp.org/ - GIMP
    - https://sourceforge.net/projects/gimp-tools/files/scripts/ - ofn-layer-tiles
    - https://github.com/kamilburda/gimp-export-layers/releases - Export Layer
- Finally, place the separated album covers in /assets/covers, comment line 22 and uncomment line 19 in index.html, and run the project!