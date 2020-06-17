class Carc{
    constructor(x,y,ima,images,dir){
        this.x = x;
        this.y = y;
        this.image = images[ima];
        this.xspeed = dir || 5;
    }
    display(){
        push();
        image(this.image,this.x,this.y);
        this.move();
        pop();
    }
    move(){
        this.x += this.xspeed;
    }
}
class Elder{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.image = round(random(0,1));
        this.images = [loadImage("Assets/elder1.png"),loadImage("Assets/elder2.png")];
    }
    display(){
        push();
        image(this.images[this.image],this.x,this.y);
        pop();
    }
}
class Virus{
    constructor(x,y,imgs){
        this.x = x;
        this.y = y;
        this.imgs = imgs;
        this.image = round(random(0,1));
        this.width = this.imgs[this.image].width;
        this.height = this.imgs[this.image].height;
    }
    display(){
        push();
        image(this.imgs[this.image],this.x,this.y);
        pop();
    }
    move(dir){
        if(this.x < 400)
            this.x++;
        else if(this.x > 400)
            this.x--;
        if(this.y >300)
            this.y--;
        else if(this.y <300)
            this.y++;
        if(dist(this.x,this.y,400,300)<100){
            minigamestate = "over";
        }
    }
}
class Thief{
    constructor(x,y,imgs,img){
        this.x = x;
        this.y = y;
        this.imgs = imgs;
        this.img = img;
    }
    display(){
        push();
        image(this.imgs[this.img],this.x,this.y,50,50);
        pop();
    }
}