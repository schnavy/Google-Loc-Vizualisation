let hist;
let caps;
let circleSize = 2;
let n = 0;
let step = 100;
let btn = true;
let dragX;
let dragY;

function preload() {
  let url = 'js/loc-hist.json';
  hist = loadJSON(url);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  textSize(40);
  dragX = width / 2;
  dragY = height / 2;

  if (btn === true) {
    setInterval(hamburg, 0);
  } else if (btn === false) {
    setInterval(germany, 0);
  }

}

function toggle() {
  clearInterval(hamburg);
  clearInterval(germany);
  btn = !btn;
  background(0);
  n = 0
  console.log(btn);
}


function draw() {





  let time = floor(hist.locations[n].timestampMs);

  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth();

  fill(0)
  rect(0, 0, 200, 150)
  fill(255)
  text(year, 20, 50)
  text(month, 20, 100)

  //Weiß nicht warum 75?? Trial and errrow

}





function germany() {
  for (var i = 0; i < step; i++) {
    let long = hist.locations[n + i].longitudeE7 / 10000000;
    let lat = hist.locations[n + i].latitudeE7 / 10000000;

    let x = map(long, -10, 30, 0, height * 2);
    let y = map(lat, 47, 54.4, height, 0);

    fill(255, 50);
    circle(x, y, circleSize, circleSize)
  }


}


function hamburg() {
  if (n < hist.locations.length - (step)) {

    push();
    translate(dragX, dragY);

    for (var i = 0; i < step; i++) {
      let long = hist.locations[n + i].longitudeE7 / 10000000;
      let lat = hist.locations[n + i].latitudeE7 / 10000000;
      let x = map(long, 9.74, 10.38, -height, height);
      let y = map(lat, 53.68, 53.43, -height / 1.4, height / 1.4);

      let prevX = hist.locations[n].longitudeE7 / 10000000;
      let prevY = hist.locations[n].latitudeE7 / 10000000;
      fill(255, 100);
      circle(x, y, circleSize, circleSize)
    }

    pop();
    n += step;
  }else {
    clearInterval(hamburg);
  }

}
