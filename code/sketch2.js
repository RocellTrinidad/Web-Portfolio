let vid;
let gridSize = 50;
let angleOffset = 0;
let colorShift = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createCapture(VIDEO); 
  vid.size(width/8, height/8);
  vid.hide(); 
  imageMode(CENTER); //set image mode to center
  noStroke(); //remove strokes for a more fluid look
}

function draw() {
  background(0, 20); //create a trailing effect by using slight transparency
  
  let cols = width / gridSize;
  let rows = height / gridSize;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * gridSize;
      let y = j * gridSize;
      let sx = int(map(i, 0, cols, 0, vid.width));
      let sy = int(map(j, 0, rows, 0, vid.height));
      
      let col = vid.get(sx, sy); //sample color from webcam
      let bright = brightness(col); //brightness level
      let size = map(bright, 0, 255, gridSize / 2, gridSize * 2); //size based on brightness
      
      fill(col);
      push();
      translate(x, y);
      rotate(sin(frameCount * 0.01 + i * j * 0.005) * PI); //create dynamic movement
      ellipse(0, 0, size, size * 0.8); //draw elliptical shapes for abstract effect
      pop();
    }
  }
}