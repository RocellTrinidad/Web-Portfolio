class Fish {
  constructor() {
    this.x = random(width); // random starting x position
    this.y = random(height); // random starting y position
    this.length = random(50, 100); // random fish length
    this.thickness = random(20, 40); // random fish thickness
    this.speed = random(1, 3) * (random() > 0.5 ? 1 : -1); // random speed and direction
    this.waveOffset = random(TWO_PI); // offset for wave motion
  }

  move() {
    this.x += this.speed; // move fish horizontally
    this.y += sin(frameCount * 0.05 + this.waveOffset) * 1.5; // apply wave-like vertical movement
    
    
    if (this.x > width + this.length / 2) {// wrap around the screen when fish moves out of bounds
      this.x = -this.length / 2;
    } else if (this.x < -this.length / 2) {
      this.x = width + this.length / 2;
    }
  }

  draw() {
    fill(255, 200, 100); // set fish color
    noStroke();

    push();
    translate(this.x, this.y);
    if (this.speed < 0) {
      scale(-1, 1); // flip fish when moving left
    }

    ellipse(0, 0, this.length, this.thickness); // draw fish body
    triangle(
      -this.length / 4, 0,
      -this.length / 1.2, this.thickness / 2,
      -this.length / 1.2, -this.thickness / 2
    ); // draw fish tail
    
    fill(0);
    ellipse(this.length / 4, 0, 5); // draw fish eye

    pop();
  }
}

class Player {
  constructor() {
    this.x = width / 2; // initial x position in the center
    this.y = height / 2; // initial y position in the center
    this.size = 30; // player size
    this.speed = 3; // movement speed
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed; //move player using key 
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed; 
    if (keyIsDown(UP_ARROW)) this.y -= this.speed; 
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed; 
  }

  draw() {
    fill(255, 0, 0); 
    ellipse(this.x, this.y, this.size); // draw player as a circle
  }
}

let fishes = []; // use array to store fish objects
let player;
let score = 0; // player score
let timer = 30; // countdown timer
let lastSpawnTime = 0; // last fish spawn time

function setup() {
  createCanvas(400, 400); 
  player = new Player(); // initialize player
  setInterval(decreaseTimer, 1000); // decrease timer every second
}

function draw() {
  background(50, 150, 200); 
  
  if (millis() - lastSpawnTime > 1000) { // spawn a new fish every second
    fishes.push(new Fish());
    lastSpawnTime = millis();
  }
  
  for (let fish of fishes) {
    fish.move(); // move each fish
    fish.draw(); // draw each fish
  }
  
  player.move(); // move player
  player.draw(); // draw player
  
  checkCollision(); // check for player-fish collisions
  displayScoreAndTimer(); // display score and timer
}

function checkCollision() {
  for (let i = fishes.length - 1; i >= 0; i--) {
    let d = dist(player.x, player.y, fishes[i].x, fishes[i].y);
    if (d < player.size / 2 + fishes[i].thickness / 2) { // check if player collides with a fish
      fishes.splice(i, 1); // remove fish from array
      score++; // increase score
    }
  }
}

function displayScoreAndTimer() {
  fill(255);
  textSize(20);
  text(`Score: ${score}`, 10, 30); // display score
  text(`Time: ${timer}`, 10, 60); // display timer
}

function decreaseTimer() {
  if (timer > 0) {
    timer--; // decrease timer
  } else {
    noLoop(); // stop the game when timer reaches 0
    fill(255);
    textSize(30);
    text("Time's Up!", width / 2 - 70, height / 2); // game over 
  }
}
