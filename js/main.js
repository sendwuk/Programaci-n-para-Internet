var game = new Phaser.Game(800, 600, Phaser.AUTO, 'area', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursor;
var paletas;
var score = 0;
var scoreText;
var healthText;
var hearts;
var enemy;


function preload() {

    game.load.image('sky', 'assets/landscape.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('paleta', 'assets/lolipop.png');
    game.load.image('heart', 'assets/heart.png');
    game.load.spritesheet('dude', 'assets/personaje.png', 32.74, 48);
    game.load.spritesheet('enemyDer','assets/enemyDer.png',37,45,18);


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
    player = game.add.sprite(0, 0, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    enemy= game.add.sprite(32,game.world.height-110,'enemyDer');
    enemy.animations.add('walk');
    enemy.animations.play('walk',50,true);
    game.add.tween(enemy).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
    paletas = game.add.group();
    paletas.enableBody = true;
    hearts=game.add.group();
    hearts.enableBody=true;
    madeLolipops();
    health();
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    healthText = game.add.text(16, 46, 'health:', { fontSize: '32px', fill: '#000' });

}

function update() {
    game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
    if(enemy.x>=800){
        enemy.x=0;
        enemy.animations.play('walk',50,true);
        game.add.tween(enemy).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
    }


    game.physics.arcade.collide(paletas, platforms);
    game.physics.arcade.overlap(player, paletas, collectLolipop, null, this);
    game.physics.arcade.overlap(player,enemy,enemyOverlap,null,this);

}
function enemyOverlap(player,enemy,heart){
    heart.kill();

}

function collectLolipop (player, paleta) {
    score += 10;
    scoreText.text = 'Score: ' + score;
    paleta.kill();

}
function health(){
    var i,j;
    for(i =0,j=115;i<3;i++,j+=35){
        var heart = hearts.create(j,49,'heart');
        heart.scale.setTo(1,1);
    }


}

function madeLolipops(){
    for (var i = 0; i < 12; i++) {
        var paleta = paletas.create(i * 70, 0, 'paleta');
        paleta.scale.setTo(1.5,1.5);
        //  Let gravity do its thing
        paleta.body.gravity.y = 600;

        //  This just gives each star a slightly random bounce value
        //paleta.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}

