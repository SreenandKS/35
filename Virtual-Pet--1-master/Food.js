class Foods{
    constructor(){
        this.img = loadImage("Milk.png");
        var foodStock,lastFed;
    }
    display(){
        var x=80;
        var y=100;

        imageMode(CENTER);
        image(this.img,220,220,70,70);
        if(this.foodStock!=0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",(data)=>{
            foodS = data.val();
        })
    }
    updateFoodStock(x){
        database.ref('/').update({
            Food : x
        })
    }
    deductFood(){

    }
}

// getCount(){
//     var playerCountRef = database.ref('playerCount');
//     playerCountRef.on("value",(data)=>{
//       playerCount = data.val();
//     })
//   }