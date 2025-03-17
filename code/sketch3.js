let xLoc = []
let yLoc = []
let numSegments = 150;
let mvmnt = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numSegments; i++) {
    xLoc[i] = width / 2;
    yLoc[i] = height / 2;
  }
  noFill();
  cursor(CROSS);
}

function draw() {
  background(10, 10, 30, 50); // semi-transparent background for trailing effect
  
  xLoc[numSegments - 1] = lerp(xLoc[numSegments - 1], mouseX, 0.2); //linear interpolation (lerp()) to create a smooth motion effect in both x and y direction 
  yLoc[numSegments - 1] = lerp(yLoc[numSegments - 1], mouseY, 0.2);
  
  for (let i = 0; i < numSegments - 1; i++) {
    xLoc[i] = lerp(xLoc[i], xLoc[i + 1], 0.4);
    yLoc[i] = lerp(yLoc[i], yLoc[i + 1], 0.4);
    
    let diameter = sin(map(i, 0, numSegments - 1, 0, PI)) * 100 + 10 * sin(millis() * 0.005);//determines the diameter of each segment in the trail, changes dynamically based on its position and time, millis() gets the time in milliseconds 
    let hueVal = (i * 2 + mvmnt) % 255;
    
    stroke(hueVal, 200, 255 - hueVal, 150); // Dynamic color variation
    strokeWeight(2);
    
    ellipse(xLoc[i], yLoc[i], diameter);
  }
  
  mvmnt = (mvmnt + 1) % 255; // Looping color change
}
