//declaring the sprites
var ghost,ghostRunning;
var door, doorImg, doorGroup;
var climber, climberImg;
var tower, towerImg;
var ghostJump;
var invisibleLedge;
var climberGroup;
var invisibleLedgeGroup;
var PLAY = 1;

var END = 0;

gamestate=PLAY;



function preload(){
ghostRunning=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostJump=loadImage("ghost-jumping.png");
  towerImg=loadImage("tower.png");
  
  
}


function setup(){
      //creating the canvas
              createCanvas(windowWidth,windowHeight);
      
              ghost = createSprite(300,height-260,20,50);
              ghost.addImage("ghost",ghostRunning);
  
  
  ghost.debug = true;
  ghost.setCollider("rectangle",0,20,130,200);
ghost.scale=0.3;
  
  tower=createSprite(width/2,height/2,20,20 );
  tower.addImage("tower",towerImg);
  tower.scale=1;
  tower.velocityY=4;
  
  doorGroup = createGroup();
  invisibleLedgeGroup = createGroup();
  climberGroup = createGroup();
}

function draw(){
  background("black");
  if(tower.y>displayHeight){
                tower.y=300;
              }
    ghost.depth=tower.depth;
  ghost.depth=ghost.depth+1;
  
  console.log(gamestate);
  
  if (gamestate===PLAY){
  
  
  ghost.velocityY=ghost.velocityY+0.1;
  if(touches.length>0||keyDown("space")){
                ghost.velocityY=-6; 
             
                touches=[];
              }
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+10;
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-10;
  }
      spawnDoors();
  
   if(ghost.isTouching(climberGroup)){
     ghost.velocityY=0;
   }
    if(invisibleLedgeGroup.isTouching(ghost)||ghost.y>height){
      gamestate=END;
    }
    camera.position.x = ghost.x;
    camera.position.y = ghost.y
  }
  
  
  
  if (gamestate===END){
    ghost.destroy();
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    invisibleLedgeGroup.destroyEach();
    fill("yellow");
    stroke("yellow");
    textSize(32);
    tower.destroy();
    text("GAME OVER",ghost.x,ghost.y);
  }
    drawSprites();
}

function spawnDoors(){
  if(camera.position.x>500&&frameCount % 140===0){
    var rand = random(100,width-100);
door=createSprite(width+20,0,40,10);
    door.x=Math.round(rand);
  door.velocityY=3;
    door.addImage(doorImg);
    
    climber=createSprite(width+20,50,30,30);
    climber.x=Math.round(rand);
    climber.velocityY=3;
    climber.addImage(climberImg);
   
    
  invisibleLedge=createSprite(width+20,55,80,15);
    invisibleLedge.x=Math.round(rand);
    invisibleLedge.velocityY=3;
    invisibleLedge.visible=false;
    
    
    door.depth=ghost.depth;
    door.depth=door.depth-1;
    
climber.depth=ghost.depth;
    climber.depth=climber.depth-1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleLedgeGroup.add(invisibleLedge);
    
}
 
}




















