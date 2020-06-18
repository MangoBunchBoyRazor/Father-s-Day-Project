//const {World,Bodies,Body,Engine} = Matter;
var backgroundImg, game1background, game2background, game3background, soundImg;
var gameState = "start";
var elements = [],score = 0;
var database, drawingData, journalData, drawingKeys = [], journalKeys = [];
var backgroundSnd;
function preload(){
    soundFormats('mp3');
    backgroundImg = loadImage("Assets/BackgroundImg.jpg");
    game1background = loadImage("Assets/game1background.png");
    game2background = loadImage("Assets/game2background.png");
    game3background = loadImage("Assets/game3background.png");
    soundImg = loadImage("Assets/soundImg.png");
    //Firebase Database config
    var firebaseConfig = {
        apiKey: "AIzaSyApgwGl_2u-ka2IL3eZkNXsET29KjGN0-4",
        authDomain: "test-project-a08e8.firebaseapp.com",
        databaseURL: "https://test-project-a08e8.firebaseio.com",
        projectId: "test-project-a08e8",
        storageBucket: "test-project-a08e8.appspot.com",
        messagingSenderId: "952912058078",
        appId: "1:952912058078:web:c5594066577b89ae6c944f",
        measurementId: "G-7PQ75EDBKJ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    backgroundSnd = loadSound("https://raw.githubusercontent.com/MohamedRazeen102006/Father-s-Day-Project/master/BackgroundMusic.mp3");
}
function setup(){
    createCanvas(800,600);
    CreateDOMElements(gameState);

    //Get all the values from the database
    database = firebase.database();
    let ref = database.ref('drawings');
    drawingKeys = ["Default"];
    ref.on('value',getDrawingData,errData);
    ref = database.ref('Entries');
    ref.on('value',getJournalData,errData);
}
function ChangeModeToPlay(){
    gameState = "play";
    CreateDOMElements(gameState);
    create();
}
function ChangeModeToJournal(){
    gameState = "journal";
    CreateDOMElements(gameState);
}
function ChangeModeToMiniGame(){
    gameState = "MiniGame";
    CreateDOMElements(gameState);
    searchKeysForDrawing();
}
function CreateDOMElements(mode){
    for(let i = 0; i < elements.length; i++)
        elements[i].remove();
    elements = [];
    switch(mode){
        case "start":
            let startBtn = createButton('Create your dad character!');
            let journalBtn = createButton('Write a journal entry!');
            let minigameBtn = createButton('Play mini games!');
            startBtn.class('button');
            journalBtn.class('button');
            minigameBtn.class('button');
            startBtn.position(295,300);
            journalBtn.position(400-journalBtn.width/2,375);
            minigameBtn.position(400-minigameBtn.width/2,450);
            startBtn.mouseClicked(ChangeModeToPlay);
            journalBtn.mouseClicked(ChangeModeToJournal);
            minigameBtn.mouseClicked(ChangeModeToMiniGame);
            startBtn.size(startBtn.width+50,50);
            minigameBtn.elt.disabled = true;
            elements.push(startBtn,journalBtn,minigameBtn);
            break;
        case "play":
            let jrnBtn1 = createButton('go to journal');
            let mgBtn1 = createButton('play Mini Games');
            jrnBtn1.class('button');
            mgBtn1.class('button');
            jrnBtn1.position(50,25);
            mgBtn1.position(630,25);
            jrnBtn1.mouseClicked(ChangeModeToJournal);
            mgBtn1.mouseClicked(ChangeModeToMiniGame);
            elements.push(jrnBtn1,mgBtn1);
            break;
        case "journal":
            let mgBtn2 = createButton('play Mini Games');
            let plBtn1 = createButton('go to Dad Creation');
            let nameInput = createInput('Your journal entry');
            let textarea = createElement('textarea',"You need to give a name to your entry to save it. If you want to retrieve a saved entry then type the name of the entry in the text box");
            let saveButton = createButton('Save');
            mgBtn2.class('button');
            plBtn1.class('button');
            saveButton.class('button');
            nameInput.class('inpClass');
            mgBtn2.position(50,25);
            plBtn1.position(630,25);
            saveButton.position(725,475);
            nameInput.position(40,200);
            textarea.position(40,225);
            mgBtn2.mouseClicked(ChangeModeToMiniGame);
            plBtn1.mouseClicked(ChangeModeToPlay);
            saveButton.mouseClicked(saveEntry);
            nameInput.input(searchKeysForEntry);
            nameInput.style('width','20%');
            textarea.style('resize','none');
            textarea.size(750,300);
            elements.push(mgBtn2,plBtn1,textarea,nameInput,saveButton);
            break;
        case "MiniGame":
            let button1 = createButton('go to Dad Creation');
            let button2 = createButton('go to Journal');
            let playBtn = createButton('Play');
            nmInp = createInput('Default');
            button1.class('button');
            button2.class('button');
            playBtn.class('button');
            nmInp.class('inpClass');
            button2.position(630,25);
            button1.position(50,25);
            playBtn.position(375,525);
            nmInp.position(50,260);
            playBtn.size(100,'auto');
            playBtn.mouseClicked(startGame);
            button1.mouseClicked(ChangeModeToPlay);
            button2.mouseClicked(ChangeModeToJournal);
            nmInp.input(searchKeysForDrawing);
            elements.push(button1,button2,nmInp,playBtn);
            toDraw = false;
            break;
        default:
            break;
    }
}
function draw(){
    textFont("Trebuchet MS");
    textAlign(CENTER);
    textSize(40);
    
    if(gameState != "start")
        background(backgroundImg);
    else
        background(255,255,0);

    if(gameState === "start"){
        fill(0,0,255);
        textFont("Trebuchet MS");
        textStyle(BOLD);
        text("Wishing you a Happy Father's Day!",width/2,100);
        textSize(20);
        textAlign(LEFT);
        fill(0,0,0);
    }
    else if(gameState === "play"){
        fill(0,0,255,200);
        textStyle(BOLD);
        text("Let's create our Dad!",width/2,75);
        fill(0,255,200,250);
        textSize(17);
        text("What is your Dad's name?",400,125);
        text("You can try to draw your dad here",400,175);
        fill(0,0,0);
        text("Good Luck!",400,195);
        fill(color(elements[6].value()));
        text("Color",245,218);
        update();
    }
    else if(gameState === "journal"){
        fill(255,0,0,200);
        text("Journal",width/2,100); 
        fill(0,0,0);  
        textSize(20);
        text("Here you can write anything with your Dad!",width/2,150);
        textAlign(LEFT);
        textSize(15);
        fill(0,0,255,255);    
        text("You can also retrieve a saved journal entry by typing the name",300,203);
        text("You need to type the journal entry here in order to save the journal entry",20,180);
    }
    else if(gameState === "MiniGame"){
        textAlign(CENTER);
        fill(0,255,0,200);
        text("Mini Games!",width/2,100);
        textSize(20);
        fill(255,0,255,200);
        text("You can either play games with your dad or on your own",width/2,150);
        fill(0);
        text("Your character",100,200);
        textSize(15);
        textAlign(LEFT);
        fill(0,255,200,150);
        text("You can unlock players by playing the games",40,225);
        text("Or create your own player on the dad creation screen",40,240);
        if(toDraw){
            drawCharacter(25,300,character,2);
        }
        if(minigamestate != "start"){
            games[game]();
            for(let i = 0; i < elements.length; i++)
                elements[i].hide();
        }
        else{
            for(let i = 0; i < elements.length; i++)
                elements[i].show();
        } 
    }
    if(gameState != "start"){
        push();
        textAlign(CENTER);
        textSize(25);
        fill(0);
        text("Score:"+score,width/2,25);
        pop();
    }
    if(minigamestate != "playing" && minigamestate != "over")
    image(soundImg,0,height-75);
}
function mousePressed(){
    if(mouseX>width/2-175&&mouseX<525&&mouseY<575&&mouseY>225&&gameState==="play")
        drawPath();
    if(mouseX > 0 && mouseX < 75 && mouseY > 525 && mouseY < height && minigamestate != "playing" && minigamestate != "over")
        ToggleSound();
}
function mouseReleased(){
    if(gameState === "play" && isDrawing)
        isDrawing = false;
}
function errData(err){
    console.log(err);
}
function ToggleSound(){
    if(backgroundSnd.isPlaying())
        backgroundSnd.pause();
    else    
        backgroundSnd.loop();
}