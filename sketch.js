  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var sword,swordImg ,swordGroup; 
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  swordImg = loadImage("sword.png")
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  swordGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {

  background(255);
  stroke("white");
    text("Puntiación " + Math.round(score), width-150, 50);
    

  if (gameState === "play") {

    if(tower.y > 500){
      tower.y = 300
    } 

    score += 1/10;

    if(keyDown("LEFT_ARROW")){
        ghost.x = ghost.x - 3;

      //escribir el código para mover al fantasma a la izquierda al presionar la flecha izquierda
    }
    if(keyDown("RIGHT_ARROW")){
  
          ghost.x = ghost.x + 3;

      //escribir el código para mover el fantasma a la derecha al presionar la flecha derecha 
      
    }
    if(keyDown("UP_ARROW")){
  
         ghost.velocityY = -10;

      //escribir el código para mover el fantasma hacia arriba al presionar la flecha arriba 
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //escribir una condición para desplazar infinitamente la torre
      
    
      spawnDoors();

  
//escribir el código para hacer que invisibleBlockGroup colisione con el fantasma y cambiar gamestate a end.
     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 || ghost.y < 0 ){
      ghost.destroy();
      gameState = "end"
    }
    if(swordGroup.isTouching(ghost) || ghost.y > 600 || ghost.y < 0 ){
      ghost.destroy();
      gameState = "end"
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fin del juego", 230,250)
  }
}

function spawnDoors()
 {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    var sword = createSprite(50,15);
    sword.scale = 0.5;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //agregar la función random
    door.x = Math.round(random(100,500));
    sword.x = Math.round(random(100,500));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    sword.addImage(swordImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    sword.velocityY = 1;

    //cambiar la profundidad del fantasma y de la puerta
    
     
ghost.depth = door.depth;
    door.depth =1;
    
    //asignar lifetime a door, climber y invisible block

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle); aquí los obstáculos son door, climber, invisible block
    
     doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    swordGroup.add(sword);
  }
}

