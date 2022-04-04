outputWidth = 3102;
outputHeight = 1260;

function setup() {
  createCanvas(outputWidth, outputHeight);
  frameRate(1);
}

function draw() {
  const rectangles = [];
  const alpha = 125;

  // black
  rectangles.push(new Rectangle(outputWidth, outputHeight, color(0, 0, 0, alpha)));

  const linePosition = outputHeight/4 + random(outputHeight/2)
  rectangles.push(new Line(outputWidth, linePosition, color(232, 197, 156, 255)));
  rectangles.push(new Line(outputWidth, linePosition + 200, color(232, 197, 156, 255)));

  // red
  rectangles.push(new Rectangle(outputWidth, outputHeight, color(227, 163, 175, alpha)));
  // yellow
  rectangles.push(new Rectangle(outputWidth, outputHeight, color(227, 215, 163, alpha)));
  // green
  rectangles.push(new Circle(outputWidth, outputHeight, color(175, 227, 163, alpha)));
  // blue
  rectangles.push(new Rectangle(outputWidth, outputHeight, color(0, 0, 255, alpha)));


  background(255, 250, 240);
  const shuffledRectangles = arrayShuffle(rectangles);
  shuffledRectangles.forEach(r => {
    r.draw();
  })
  console.log(frameCount);
  save(frameCount + '.jpg');
  if(frameCount == 100) {
    noLoop();
  }
}

class Rectangle {
  constructor(width_, height_, color) {
    this.position = {x: random(width_), y: random(height_)};
    this.color = color;
  }

  draw() {
    push();
    fill(this.color);
    noStroke();
    translate(this.position.x, this.position.y);
    beginShape();
    const offset = 400;
    const vertexNum = 4;
    for (let i=0; i < vertexNum; i++) {
      const r = offset + random(400);
      vertex(r*cos(radians(360*i/vertexNum)), r*sin(radians(360*i/vertexNum)));
    }
    endShape();
    pop();
  }
}

function arrayShuffle(array) {
  for(var i = (array.length - 1); 0 < i; i--){

    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

class Circle {
  constructor(width_, height_, color) {
    this.position = {x: random(width_), y: random(height_)};
    this.color = color;
  }

  draw() {
    fill(this.color);
    noStroke();
    const r = 800;
    ellipse(this.position.x, this.position.y, r + random(200), r + random(200));
  }
}

class Line {
  constructor(width_, height_, color) {
    this.position = {x: random(width_), y: height_};
    this.color = color;
  }

  draw() {
    stroke(this.color);
    strokeWeight(1);
    const length = width * 3/5;
    let lastX = 0;
    let lastY = this.position.y;
    const step = 180;
    for(let t=0; t<step; t++) {
      strokeWeight(60 + 6 * sin(radians(t * 12)));
      const x = (t+1) * length/step;
      // const y = this.position.y + noise(t) * 60;
      const y = this.position.y + (10 * sin(radians(t * 5) - 5));
      line(lastX, lastY, x, y);
      lastX = x;
      lastY = y;
    }
  }
}