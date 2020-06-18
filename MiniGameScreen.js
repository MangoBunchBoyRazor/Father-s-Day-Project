var games = [game1, game2, game3], game = 0, minigamestate = "start", timer, character = "";
var Car = null, Car2 = null, elder = null;
var viruses = [], house, house1, house2, thief, thiefImgs;

function drawCharacter(x,y,index,number){
    let data = drawingData.val();
    let playerImg = data[index];
    push();
    noFill();
    translate(x,y);
    for(i = 0; i < playerImg.drawing.length; i++){
        beginShape();
        for(j = 0; j < playerImg.drawing[i].points.length; j++){
            let colors = playerImg.drawing[i].color.levels;
            let points = playerImg.drawing[i].points;
            stroke(colors[0],colors[1],colors[2],colors[3]);
            vertex(points[j].x/number,points[j].y/number);
        }
        endShape();
    }
    pop();
}
function searchKeysForDrawing(){
    if(nmInp.value()){
        for(i = 0; i < drawingKeys.length; i++){
            if(nmInp.value() == drawingKeys[i]){
                toDraw = true;
                character = drawingKeys[i];
                return null;
            }
        }
        character = drawingKeys[i];
        return null;
    }
}
function startGame(){
    game = round(random(0,2));
    viruses = [];
    house = loadImage("Assets/house.png");
    house1 = loadImage("Assets/game3house1.png");
    house2 = loadImage("Assets/game3house2.png");
    thief = null;
    thiefImgs = [
        loadImage("Assets/thief1.png"),
        loadImage("Assets/thief2.png")
    ];
    minigamestate = "playing";
    let exitBtn = createButton('exit');
    exitBtn.class('button');
    exitBtn.position(730,25);
    timer = 10;
    let t = setInterval(function(){
        timer--;
        if(game == 1 && minigamestate == "playing")
            score++;
        if(timer <= 0){
            timer = 10;
            if(game!=2)
                game++;
           else    
                game=0;
            minigamestate = "playing";
            viruses = [];
        }
    },1000);
    exitBtn.mouseClicked(function(){minigamestate = "start";exitBtn.remove();clearInterval(t);timer=0});
}
function displayTimer(){
    push();
    textAlign(CENTER);
    text("Time:"+timer,50,50);
    stroke(255,0,0);
    strokeWeight(10);
    line(0,5,timer*80,5);
    pop();
}
function game1(){
    background(game1background);
    displayTimer();
    if(!elder)
        elder = new Elder(random(50,750),25);
    if(minigamestate == "playing"){
        push();
        textSize(25);
        textAlign(CENTER);
        fill(0,255,255,230);
        text("Help the elders cross the road!",width/2,100);
        textSize(20);
        text("Use the mouse to drag them to the other side",width/2,125);
        pop();
        let cars = [
            loadImage("Assets/car1.png"),
            loadImage("Assets/car2.png"),
            loadImage("Assets/car3.png"),
            loadImage("Assets/car4.png")
        ];
        let car = 0;
        drawCharacter(mouseX,mouseY,character,7);
        if(frameCount%60===0){
            car = round(random(0,3));
            Car = new Carc(0,random(100,286),car,cars,12);
        }
        if(elder.y > 520){
            elder = new Elder(random(50,750),25);
            score++;
        }
        elder.display();
        if(frameCount%90===0){
            car = round(random(0,3));
            Car2 = new Carc(width,random(300,height-100),car,cars,-7);
        }
        if(Car){
            Car.display();
            if(dist(Car.x,Car.y,elder.x,elder.y) < 70){
                minigamestate = "over";
            }
        }
        if(Car2){
            Car2.display();
            if(dist(Car2.x,Car2.y,elder.x,elder.y) < 70){
                minigamestate = "over";
            }
        }
        if(mouseIsPressed){
            if(mouseX < elder.x+elder.images[elder.image].width && mouseX > elder.x
                &&mouseY < elder.y+elder.images[elder.image].height && mouseY > elder.y
                &&gameState == "MiniGame" && minigamestate == "playing"){
                    elder.x = mouseX-elder.images[elder.image].width/2; elder.y = mouseY-elder.images[elder.image].height/2;
            }
        }
    }
    if(minigamestate == "over"){
        push();
        textSize(25);
        textAlign(CENTER);
        fill(255,200,200,230);
        text("Game over",width/2,150);
        text("Your final score was:"+score,width/2,200);
        text("Press n to go to next game",width/2,225);
        pop();
        if(keyIsPressed && key == "n"){
            timer = 10;
            game++;
            elder = null;
            Car = null;
            Car2 = null;
            minigamestate = "playing";
            if(game == 1)
                viruses = [];
        }
    }
}
function game2(){
    background(game2background);
    displayTimer();
    push();
    imageMode(CENTER);
    image(house,width/2,height/2,300,200);
    pop();
    let images = [loadImage("Assets/virus1.png"),loadImage("Assets/virus2.png")];
    if(minigamestate == "playing"){
        drawCharacter(mouseX,mouseY,character,7);
        push();
        textSize(20);
        textAlign(CENTER);
        text("Keep the germs away from your house!",width/2,100);
        text("Drag them away from the house",width/2,125);
        pop();
        if(frameCount%150==0){
            viruses.push(new Virus(random(0,75),random(0,600),images));
            viruses.push(new Virus(random(725,800),random(0,600),images));
        }
        let selectedVirus = null;
        for(let i = 0; i < viruses.length; i++){
            viruses[i].display();
            viruses[i].move(house);
            let distance = dist(mouseX,mouseY,viruses[i].x+viruses[i].width/2,viruses[i].y+viruses[i].height/2);
               if(mouseIsPressed && distance < 150){
                    selectedVirus = viruses[i];
               }
        }
        if(selectedVirus){
            selectedVirus.x = mouseX-selectedVirus.width/2;
            selectedVirus.y = mouseY-selectedVirus.height/2;
        }
    }
    if(minigamestate == "over"){
        textAlign(CENTER);
        textSize(25);
        fill(0,0,0);
        text("Game Over! You got infected!",400,100);
        text("Press n to go to the next game",400,125);
        text("Your final score:"+score,400,150);
        if(keyIsPressed && key == 'n'){
            game++;
            timer = 10;
            minigamestate = "playing";
        }
    }
}
function game3(){
    background(game3background);
    displayTimer();
    const poses = [
        {   x: 10, y: 570  },
        {   x: 750, y: 525  },
        {   x: 170, y: 325  },
        {   x: 330, y: 510  },
        {   x: 660, y: 510  }
    ];
    if(minigamestate === "playing"){
        drawCharacter(mouseX,mouseY,character,7);
        push();
        textAlign(CENTER);
        textSize(23);
        fill(0,0,0);
        text("Catch the thieves!",width/2,100);
        textSize(20);
        text("Click on them",width/2,125);
        pop();
        if(frameCount%60==0){
            let pos = round(random(0,4));
            if(pos == 0)
                thief = new Thief(poses[pos].x,poses[pos].y,thiefImgs,0);
            else if(pos == 1)
                thief = new Thief(poses[pos].x,poses[pos].y,thiefImgs,1);
            else if(pos == 2)
                thief = new Thief(poses[pos].x,poses[pos].y,thiefImgs,1);
            else if(pos == 3)
                thief = new Thief(poses[pos].x,poses[pos].y,thiefImgs,0);
            else if(pos == 4)
                thief = new Thief(poses[pos].x,poses[pos].y,thiefImgs,1);
        }
        if(thief){
            thief.display();
            if(mouseIsPressed && mouseX > thief.x && mouseX < thief.x + 50
                && mouseY > thief.y && mouseY < thief.y + 50){
                    thief = null;
                    score++;
                }
        }
        image(house1,0,93,179,470);
        image(house2,362,240,317,317);
    }
}