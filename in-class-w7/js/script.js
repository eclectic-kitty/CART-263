let weather;
let time;


function preload() {
    weather = loadJSON('https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&hourly=temperature_2m,cloudcover,windspeed_10m,winddirection_10m&daily=sunrise,sunset&timezone=America%2FChicago&past_days=1');
}


function setup() {
    createCanvas(360, 180);
    colorMode(HSL);
    textAlign(CENTER, CENTER);
    print(weather);
    noStroke();

    time = hour() + 24;
    print(time);

    let brightness = weather.hourly.cloudcover[time]
    print(brightness);
    brightness = map(brightness, 0, 100, 95, 0);
    print(brightness);
    background(0, 100, brightness);

    let xPos = weather.longitude;
    xPos = map(xPos, -180, 180, 0, width);
    let yPos = weather.latitude;
    yPos = map(yPos, -90, 90, 0, height);
    fill(240, 100, 90);
    ellipse(xPos, yPos, 10);

    for (i = 0; i < 5; i++) {
        let tempColor = weather.hourly.temperature_2m[time - i];
        tempColor = map(tempColor, 0, 30, 240, 359);
        fill(tempColor, 100, 70);
        ellipse((width/2) - (i * 20), 20, 15 - (i * 2));
    }
    
    fill(100);
    text("wind direction: " + weather.hourly.winddirection_10m[time], width/2, height/2 - 10);
    text("wind speed: " + weather.hourly.windspeed_10m[time], width/2, height/2 + 10);
}


function draw(){
}
