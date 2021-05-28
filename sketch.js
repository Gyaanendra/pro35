var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var newPosition;
var database;
var balloonPositionRef;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database( );
  balloonPositionRef = database.ref('balloon/height');
  balloonPositionRef.on("value",readPosition, showError);

  createCanvas(1500,700);
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
   if(newPosition !== undefined){
   
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-1,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){
  balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
   balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,1);
  }

  drawSprites();

  fill(0); 
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
}

function changePosition(x,y) {
  database.ref('balloon/height').update({
    'x':newPosition.x + x,
    'y':newPosition.y + y
})
}

function readPosition(data){
  newPosition = data.val();
  
  balloon.x = newPosition.x;
  balloon.y = newPosition.y;
  }

  function showError (){
    console.log("Error in writing to  the database");
  }
