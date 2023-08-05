var lander, landerImg;
var ground, bgImg, background;
var platform;
var fuel = 100;
var gameState = "launch"
var vx = 0;
var vy = 0;
var g = 0.05;

function preload(){
  bgImg = loadImage("assets/bg_sur.png");
  landerImg = loadImage("assets/real ship.png");
  landerthrustImg = loadAnimation("assets/lander_thrust.png")
  bgLandImg = loadAnimation("assets/bg.png");
  capsuleImg = loadImage("assets/capsule1.png");
  
  capsuleThrustImg = loadAnimation("assets/capsule_thrust.png");
  //land = loadAnimation("assets/capsule_thrust.png");

  crash = loadAnimation("assets/lander_crash0.png","assets/lander_crash1.png","assets/lander_crash2.png");
  left_thrust = loadAnimation("assets/left_thrust0","assets/left_thrust1");
  right_thrust = loadAnimation("assets/right_thrust0","assets/right_thrust1");
  obstacleImg = loadImage("assets/obstacle.png");
  normal = loadAnimation("assets/real ship.png");

  thrust.playing = true;
  thrust.looping = false;
  land.looping = false;
  crash.looping = false;
  left_thrust.looping = false;
  right_thrust.looping = false;
}

function setup(){
  createCanvas(1000, 700);
  background = createSprite(500, 350, 1000, 700);
  background.addImage(bgImg);
  background.addAnimation("change", bgLandImg);
  lander  = createSprite(500, 570, 100, 100);
  lander.addImage(landerImg);
  lander.scale = 0.5;
  lander.addAnimation("thrusting", landerthrustImg);
  lander.addAnimation("thrust_cap", capsuleThrustImg);
  platform = createSprite(520, 700, 200, 10);
  rectMode(CENTER);
  textSize(14);
}

function draw(){
  lander.collide(platform);
  drawSprites();
  push();
  fill(255);
  text("Vertical Velocity: " +round(vy), 800, 75);
  text("Horizontal Velocity: " +round(vx), 800, 50);
  fill("yellow");
  text("Fuel Level: " +round(fuel), 20, 50);
  pop();
  vy = vy + g
  lander.position.y = lander.position.y + vy
  takeOff();
  if(gameState === "land"){
    lander.changeAnimation("thrust_cap");
  }

  console.log(lander.position.y);
}

function keyPressed(){
  if(keyCode ==  UP_ARROW && gameState === "launch"){
    vy = -1;
    fuel = fuel - 0.33
    lander.changeAnimation('thrusting');
    console.log(lander.position.y);
    takeOff();
  }

  if(keyCode == LEFT_ARROW){
    vx = vx + 0.1
    fuel = fuel - 0.33
  }

  if(keyCode == RIGHT_ARROW){
    vx = vx - 0.1
    fuel = fuel - 0.33
  }
}

function takeOff(){
  if(lander.position.y <= 0){
    background.changeAnimation('change');
    gameState = "land"
  }
}

function stop(){
  vx = 0
  vy = 0
  fuel = 0
  g = 0  
}