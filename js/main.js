var game = new Phaser.Game(800, 600, Phaser.AUTO, 'area', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var lollipops;
var score = 0;
var scoreText;
var lives;
var enemy;
var stateText;

function preload() {

    game.load.image('sky', 'assets/landscape.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('lollipop', 'assets/lollipop.png');
    game.load.image('heart','assets/heart.png');
    game.load.spritesheet('enemy','assets/enemy.png',77,65);
    game.load.spritesheet('dude', 'assets/player.png', 32.796, 48);

}


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'sky');
    platforms=game.add.group();
    platforms.enableBody=true;
    var ground=platforms.create(0,game.world.height-64,'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable=true;
    var ledge= platforms.create(400,400,'ground');
    ledge.body.immovable=true;
    ledge=platforms.create(-150,250,'ground');
    ledge.body.immovable=true;


    player = game.add.sprite(32, game.world.height - 150, 'dude',1);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    enemy=game.add.sprite(0,0,'enemy',1);
    game.physics.arcade.enable(enemy);
    enemy.body.bounce.y=0.0;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds=true;
    enemy.animations.add('left',[1, 2, 3, 4], 10, true);
    enemy.animations.add('right',[5, 6, 7, 8], 10, true);
    enemy.frame=0;
    cursors = game.input.keyboard.createCursorKeys();
    createlollipops();
    createLives();
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    game.add.text(650, 16, 'lives: ', { fontSize: '32px', fill: '#000' });
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '50px Arial', fill: '#000' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

}
function createlollipops(){
    lollipops = game.add.group();
    lollipops.enableBody = true;
    for (var i = 0; i < 12; i++) {
        var lollipop = lollipops.create(i * 70, 0, 'lollipop');
        lollipop.body.gravity.y = 300;

        lollipop.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}
function createLives(){
    lives=game.add.group();
    for (var i = 0; i < 3; i++) {
        var heart = lives.create(game.world.width - 100 + (30 * i), 60, 'heart');
        heart.anchor.setTo(0.5, 0.5);
        heart.alpha = 0.4;
    }

}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy,platforms);
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.collide(lollipops, platforms);
    game.physics.arcade.overlap(player, lollipops, collectStar, null, this);
    game.physics.arcade.overlap(player,enemy,enemyOverlap,null,this);
    moveEnemy();

}
function enemyOverlap(player,enemy){
    var live=lives.getFirstAlive();
    if(live){
        live.kill();
    }
    if(lives.countLiving()<1){
        gameState('Game Over! GG')
    }
    if(enemy.body.x < game.world.width) {
        enemy.body.x = enemy.body.x + 250;
    }
    else{
        enemy.body.x = enemy.body.x + 250;
    }
}

function moveEnemy(){
    var movement = game.rnd.integerInRange(1,3);
    if(enemy.body.x>=game.world.width-250){
        movement=1;
    }if(movement === 1){
        enemy.body.velocity.x = -150;
        enemy.animations.play('left');
    }
    else if(movement === 2){
        enemy.body.velocity.x = 150;
        enemy.animations.play('right');
    }
    else if(movement === 3){
        enemy.animations.stop();
        enemy.frame = 0;
    }
    setTimeout(function timeout(){}, 1000);
}

function collectStar (player, star) {
    score += 10;
    scoreText.text = 'Score: ' + score;
    star.kill();
    if( score>=120){
        gameState('Congratulations !You are awesome');
    }
}

function gameState(msg){
    player.kill();
    enemy.kill();
    stateText.text=msg;
    stateText.visible = true;
}