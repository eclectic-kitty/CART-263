let table;
let points = [];
let pointsOrdered = [];
let pointsDateless = [];

function preload() {
  table = loadTable("EVA_Data.csv", "csv", "header");
}

function setup() {
  createCanvas(300, 1700);
  background(255);
  for (var r = 0; r < table.getRowCount(); r++) { // Cycle through each row of the table
      points[r] = new DataPoint(table.getString(r, 1), 
                                table.getString(r, 2),
                                table.getString(r, 4),
                                table.getString(r, 5), 
                                table.getString(r, 0));
                                // Pass through the values in each row
      //points[r].drawBasic();
  }

  for (var y = 1965; y < 2014; y++) {
    for (var m = 1; m < 13; m++) {
      for (var d = 1; d < 32; d++) {
        for (var i = 0; i < points.length; i++) {
          if (points[i].year == y && points[i].month == m && points[i].day == d) {
            pointsOrdered.push(points[i]);
          }
        }
      }
    }
  }

  for (var i = 0; i < points.length; i++) {
    if (!points[i].year) {
      pointsDateless.push(points[i]);
    }
  }

  for (var i = 0; i < pointsOrdered.length; i++) {
    pointsOrdered[i].drawBasic(i);
  }
}
class DataPoint { 
    constructor(country, name, date, duration, ID){ 
        // Add each data point to the object
        this.country = country;
        this.duration = duration;
        this.name = name;
        this.ID = ID;
        this.x;
        this.y;
        let dateTemp = date;
        let dateArray = dateTemp.split("/");
        this.year = int(dateArray[2]);
        this.month = int(dateArray[0]);
        this.day = int(dateArray[1]);


        this.red = color(255, 180, 225);
        this.blue = color(180, 215, 255);
    }

    drawBasic(pos){ 
        this.x = width/2;
        this.y = pos * 5;
        console.log("x: " + this.x + ", y: " + this.y);
        noStroke();
        if (this.country == "USA") {
          fill(this.blue);
        } else if (this.country == "Russia") {
          fill(this.red);
        }

        ellipse(this.x, this.y, int(this.duration)*2);

        fill(0);
        textSize(5);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
    }

    drawCircle(){
        this.radius = 150;
        this.t=0;
        this.angle = map(this.ID, 0, table.getRowCount(), 0, 1)*Math.PI*2;
        this.x = Math.cos(this.angle)*this.radius+width/2;
        this.y = Math.sin(this.angle)*this.radius+height/2;
        noStroke();
        fill(0, 200, 20, 40);
        ellipse(this.x, this.y,int(this.duration)*3);
        fill(0, 100, 200);
        textSize(5);
        push();
        if(this.angle > Math.PI/2 && this.angle < Math.PI*1.5){
          this.t = textWidth(this.name);
          fill(255, 0,0);
          translate(this.x, this.y);
          rotate(this.angle+Math.PI);
        } else { 
          translate(this.x, this.y);
          rotate(this.angle);
        }
        text(this.name, 0-this.t, 0);
        pop();
    }
}


