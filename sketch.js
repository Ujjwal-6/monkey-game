var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var highscore = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 220);
  
  monkey = createSprite(60,170,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  

  monkey.scale = 0.1;
  
  ground = createSprite(200,205,1200,5);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,210,400,10);
  invisibleGround.visible = false;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);

  //monkey.debug = true;

  score = 0;  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
   background(255);
  text("Score: "+ score, 500,50);
  text("HighScore: " + highscore , 400 , 50);
  
  
  if(gameState === PLAY){
    ground.velocityX = -(4 + 3* score/100);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    
    if(keyDown("space")&& monkey.y >= 170) {
        monkey.velocityY = -14;
        
    }
    
    
    monkey.velocityY = monkey.velocityY + 0.8;
    spawnPoints();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
        }
    
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score += 10;
    }
  }
   else if (gameState === END) {
      monkey.changeAnimation("collided", monkey_collided);
      ground.velocityX = 0;
      monkey.velocityY = 0;
    
      
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
      
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
         
   }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0) {
    obstacle = createSprite(700,185,40,10);
   obstacle.velocityX = -(6 + score/100);
    var rand = Math.round(random(1,4));
   if (rand ===1 ){
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    
     
    obstacle.lifetime = 200;
   } 
   if (rand === 2 ){
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    
     
    obstacle.lifetime = 200;
   } 
   if (rand === 3 ){
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    
     
    obstacle.lifetime = 200;
   } 
   if (rand ===4 ){
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    
     
    obstacle.lifetime = 200;
   } 
   
  
    
  obstacle.depth = monkey.depth;
    monkey.depth += 1;
  
    obstacleGroup.add(obstacle);
  }
}

function spawnPoints(){
  if (frameCount % 60 === 0) {
    
    
      banana = createSprite(650,Math.round(random(40,100)),40,10);
   banana.velocityX = -(6 + score/100);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.depth = monkey.depth;
    monkey.depth += 1;
    
     
    banana.lifetime = 200;
   bananaGroup.add(banana);
}

  
}