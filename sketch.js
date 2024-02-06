var bg_img, splash_img;
var player_img, player;
var playButton, infoButton;
var enemy,enemy_group;
var enemy1_img, enemy2_img, enemy3_img;
var gameState = "wait";
var bullet_group, bullet_img,bullet



function preload(){
    splash_img = loadImage("./assets/Game_On.gif");
    bg_img = loadImage("./assets/bg.png")
    player_img = loadImage("./assets/player.png")

    enemy1_img = loadImage("./assets/enemy.png")
    enemy2_img = loadImage("./assets/ufo.png")
    enemy3_img = loadImage("./assets/asteroid.png")
    bullet_img = loadImage("./assets/bullet.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    playButton = createImg("assets/play.png");
    playButton.position(width/3+100,windowHeight/2 + 150);
    playButton.size(80,80);
    playButton.hide();

    infoButton = createImg("assets/info.png");
    infoButton.position(width/3+300,windowHeight/2 +150);
    infoButton.size(80,80);
    infoButton.hide();

    player = createSprite(width/15- 50,windowHeight/2);
    player.addImage(player_img);
    player.scale = 0.6;
    player.visible = false;

    enemy_group = new Group();
    bullet_group = new Group();

    
}

function draw(){
    if(gameState == "wait"){
        background(splash_img);
        playButton.show();
        infoButton.show();
    }

    playButton.mousePressed( () => {
        playButton.hide();
        infoButton.hide();
        gameState = "level1"
    })

    infoButton.mousePressed(() =>{
        infoButton.hide();
        playButton.hide();
        gameState = "about"

    })

    if(gameState == "level1"){
        background(bg_img);
        player.visible = true; 
        movement();
        spawnEnemies();
        if(keyIsDown(32)){
            spawnBullets();
        }

    }

    if(gameState == "about"){
        aboutFunct();
    }

    drawSprites();
}

function aboutFunct(){
  
  swal({
    title : "About FireStorm",
    text : "To surpass a level you should defeat all enemies without faliure in a particular stage",
    textAlign : "CENTER",
    imageUrl : "/assets/Game_On.gif",
    imageSize:"200x200",
    confirmButtonText: "Back to HomeScreen",
    confirmButtonColor:"green",

  },
  function(){
    gameState = "wait";
  })
}

function movement(){

    if(player.y<20){
        player.y = 20
    }

    if(player.y>windowHeight-20){
        player.y = windowHeight-20
    }

    if(keyIsDown(UP_ARROW)){
        player.velocityY = -10;
    }
    

    if (keyIsDown(DOWN_ARROW)){
        player.velocityY = 10;
    }
}

function spawnEnemies(){
    if (frameCount%60==0){
        var random = Math.round((Math.random()*2)+1);
        

        var randomHeight = Math.round(Math.random()*windowHeight);
        


        enemy = createSprite(width-10,randomHeight);
        switch(random){
            case 1:
                enemy.addImage(enemy1_img);
                enemy.scale = 1.3;
                enemy.velocityX = -5;
                break;

            case 2:
                enemy.addImage(enemy2_img);
                enemy.scale = 1.3;
                enemy.velocityX = -5;
                break;

            case 3:
                enemy.addImage(enemy3_img);
                enemy.scale = 0.3;
                enemy.velocityX = -5;
                break;

            default:
                break;

            
        }

        enemy_group.add(enemy);
    }
}


function spawnBullets(){
    bullet = createSprite(player.x+2,player.y+2,20,20)
    bullet.addImage(bullet_img);
    bullet.scale=0.2
    bullet.velocityX = 5
    bullet.depth = player.depth
    player.depth = player.depth+1
    bullet_group.add(bullet);
    
}