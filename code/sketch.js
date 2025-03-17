let cubes = [];
let colors;
let font;
let targetAngleX = 0, targetAngleY = 0;
let angleX = 0, angleY = 0;
let textGlowOffset = 0;

function preload() {
  font = loadFont("font/2.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colors = [
    color(255, 0, 102),
    color(0, 255, 204),
    color(255, 255, 0),
    color(255, 50, 50),
    color(0, 150, 255),
    color(120, 0, 255),
  ];
  
  for (let i = 0; i < 600; i++) {
    cubes.push({
      x: random(-width / 1.5, width / 1.5),
      y: random(-height / 1.5, height / 1.5),
      z: random(-1200, 600),
      size: random(10, 50),
      baseSize: random(10, 50),
      color: random(colors),
      speed: random(2, 6),
    });
  }
}

function draw() {
  background(5, 5, 25, 220);

  resetMatrix();
  textAlign(CENTER, CENTER);

  // Animate text glow effect
  textGlowOffset += 0.08;
  let glowColor = lerpColor(color(255, 0, 255), color(0, 255, 255), sin(textGlowOffset) * 0.5 + 0.5);
  let textFloat = sin(frameCount * 0.04) * 12; // Smooth vertical hover
  
  // Main Title with holographic glow & shifting effect
  push();
  translate(0, -height / 6 + textFloat, 0);
  textSize(82);
  fill(glowColor);
  stroke(255);
  strokeWeight(8);
  textFont(font);
  text('"I just came for the ramen"', 0, 0);
  pop();

  // Smooth camera rotation
  targetAngleX = map(mouseY, 0, height, -PI / 5, PI / 5);
  targetAngleY = map(mouseX, 0, width, -PI / 5, PI / 5);
  angleX = lerp(angleX, targetAngleX, 0.08);
  angleY = lerp(angleY, targetAngleY, 0.08);

  rotateX(angleX);
  rotateY(angleY + frameCount * 0.003);

  for (let c of cubes) {
    push();
    translate(c.x, c.y, c.z);

    let pulse = sin(frameCount * 0.1 + c.z * 0.005) * 7;
    let dynamicColor = lerpColor(
      c.color,
      color(255),
      sin(frameCount * 0.04) * 0.5 + 0.5
    );

    fill(dynamicColor);
    emissiveMaterial(dynamicColor);
    stroke(0, 60);
    strokeWeight(1.5);

    box(c.baseSize + pulse);
    pop();

    c.z += c.speed * (1 + c.z / 900);

    if (c.z > 600) {
      c.z = -1200;
      c.x = random(-width / 1.5, width / 1.5);
      c.y = random(-height / 1.5, height / 1.5);
      c.color = random(colors);
      c.speed = random(2, 6);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
