var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gamever,gameover_img;

var score = 0; 
function preload(){
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 gameover_img = loadImage("game over.png");

}



function setup() {
  createCanvas(500, 400);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  gameover = createSprite(200,200,20,20);
  gameover.visible = false;
  gameover.scale = 0.230;
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  background("green");
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 5,40);
   text("score: "+ score, 400,40);
  
  
  if(ground.x >  0) {
    ground.x=ground.width/2;
  }
   
if(monkey.isTouching(FoodGroup))
  {
   score = score +1;
  }
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    //monkey.debug = true;
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);                   
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      gameover.addImage(gameover_img);
      gameover.visible = true;
      text("press Ctrl + R to restart the game.",100,390);
    }
 
  drawSprites();

}



function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;
    banana.setCollider("circle",0,0,230);
    //banana.debug = true;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;   
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,230);
    //obstacle.debug = true;
  }
}





