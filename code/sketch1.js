class Particle { // threads
  constructor(x, y) {
    this.pos = createVector(x, y); // position vector
    this.vel = createVector(0, 0); // velocity vector
    this.acc = createVector(0, 0); // acceleration vector
    this.maxSpeed = random(2, 5); // random max speed for variation
    this.color = color(random(100, 255), random(100, 255), random(255), 150); // random semi-transparent color
    this.history = []; // use array to store previous positions for thread effect
  }

  update() {// use Perlin noise to determine movement direction
    let angle = noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI * 2;
    this.acc = p5.Vector.fromAngle(angle);
    this.acc.setMag(0.1); // set small acceleration magnitude

    this.vel.add(this.acc); // update velocity
    this.vel.limit(this.maxSpeed); // limit velocity to max speed
    this.pos.add(this.vel); // update position

    this.history.push(createVector(this.pos.x, this.pos.y)); // store position history
    if (this.history.length > 50) {
      this.history.splice(0, 1); // remove oldest position to maintain thread length
    }

    if (this.pos.x < 0) this.pos.x = width; // ensures that particles wrap around the screen boundaries instead of disappearing when they move out of view --> creates the horizontal and vertical straight lines
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  display() {
    noFill(); // no fill for thread effect
    stroke(this.color); // use assigned color for stroke
    strokeWeight(1.5); // thin stroke for thread-like appearance
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      vertex(pos.x, pos.y); // draw a smooth trailing thread
    }
    endShape();
  }
}

let particles = []; // use array to store all particles

function setup() {
  createCanvas(windowWidth, windowHeight); 
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height))); // initialize particles at random positions
  }
}

function draw() {
  background(10, 10, 30, 25); // semi-transparent dark background for fading effect
  for (let p of particles) {
    p.update(); // uupdate particle motion
    p.display(); // display thread-like trails
  }
}

function mouseDragged() {
  // add new particles when the mouse is dragged
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}
