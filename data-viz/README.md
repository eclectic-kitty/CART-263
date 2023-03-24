# Tone Colour
#### Aurora Becerra Granados, for CART 263 at Concordia University, March 23d 2023

![](/assets/images/screenshot.png)

This project displays, by colour, the covers of albums from my personal music listening history over the one year period from March 11th 2022 to March 11th 2023. I was curious as to what could be gleaned about my music listening from the colours of my album covers. As will be discussed later, I didn't quite get far enough for that, but it remains interesting, in my opinion, to see what colours are prevalent in the covers of albums I listen to and how they are distributed.

The main script looks through a set of album covers included in /assets/images/covers. It then calculates an average hue, saturation, and lightness for each cover. The covers are then placed in a circle according to hue and their distance to the center varies according to either saturation or lightness.

For the project, I also wrote two other scripts. The first one, albumListScript.js, looks through my listening history to make a list of each unique album in my listening history. The second one, imgGetScript.js, uses the list generated in the previous one to download album covers for each one from Last.fm's API. 

## Installation & Running
To install and run the project, do as follows:
- Download the data-viz folder this readme is located in.
- Open the folder in an IDE like VS Code, Atom, etc. with the ability to run a local development server.
- (I use VSCodium and the Live Server extension, ID: ritwickdey.LiveServer)
- Run the development server and navigate to it in your browser!

Once running,
- It takes a couple of seconds to appear.
- You will most likely have to zoom out to make it fully visible.
- The spacebar can be used to switch between views.

If you want to generate the visualisation from a new set of covers, it's not too difficult, but it is rather involved. I detail how I did it in the readme file in /js/setup.

## Unrealised ideas, future iterations
My original idea for the project was to look at how the colours of the covers changed over time. As part of this, I also wanted to make albums I'd listened to more appear multiple time in order to emphasize what I listened to more. I had the idea that perhaps happier albums had more colourful covers and vice-versa and that I could potentially track how the colours changed depending on things like the seasons or moments during which I knew I'd been particularly sad or happy. 

I was able to code some of this, and it can be seen commented out in script.js. However, I wasn't able to finish coding shifting around different weeks. As for the other feature, I wasn't fully satisfied, from an aesthetic perspective, with how it looked when I placed multiple copies of a cover on the screen. The covers I'd listened to more simply crowded out the others and made the piece far less interesting to look at. My idea for how to fix this would have been to push these albums further back in the order of when the covers are rendered, but I didn't get around to coding this.

## Credits
Thanks to the explanation on how to calculate averages of angles in https://www.themathdoctors.org/averaging-angles/

Thanks to this guide for showing me how to split grids in GIMP: https://www.gamedev.net/tutorials/visual-arts/slicing-images-using-gimp-the-manual-and-semi-automatical-way-r5257/

Thanks to the Last.fm API for the album covers: https://www.last.fm/api