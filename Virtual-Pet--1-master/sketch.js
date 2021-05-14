var image,dog,happyDog,database,foodS,foodStock,button1,button2,fedTime,lastFed,food;

function preload()
{
	dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
 
	createCanvas(800,500);
  database = firebase.database();
  dog = createSprite(700,250,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;
  food = new Foods();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  button1 = createButton('Feed the dog');
  button1.position(850,100);
  button1.style('background','lightBlue');
  button1.mousePressed(feedDog);
  button2 = createButton('Add Food');
  button2.position(950,100);
  button2.style('background','lightBlue');
  button2.mousePressed(addFoods);
}


function draw() {  

  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  food.display();

  drawSprites();
  textSize(20);
  fill(255,144,4);
  stroke(0);
  text("food left " +  foodS,10,300);
  text("PRESS UP ARROW KEY TO FEED DRAGO MILK",10,30);

  fill(255,255,254);
  textSize(15);

  if(lastFed>= 12){
    text("Last Feed : "+lastFed%12 + " PM",350,50);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,50);
  }
  else{
    text("Last Feed : "+ lastFed + " AM",350,50);
  }

 
}


function addFoods(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodS--
  if(foodS <= 0){
    foodS = 0;
  }
  // food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food : foodS,
    FeedTime : hour()
  })

}

function readStock(data){
  
  foodS = data.val();
}
function writeStock(x){
   if(x <= 0){
      x = 0;
   } 
   else{
      x = x-1;
   } 
   database.ref('/').update({
      Food : x
   })
   }
