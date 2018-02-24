var game = new Phaser.Game(800, 600, Phaser.AUTO, 'area', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursor;
var paletas;
var score = 0;
var scoreText;


function preload() {

    game.load.image('fondo', 'assets/ladscape.png');
    game.load.image('paleta', 'assets/lolipop.png');
    game.load.image('piso', 'assets/platform.png');
    game.load.spritesheet('jugador','assets/personaje.png', 32.74, 48);



}


function create() {
    game.physics.paletatSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'fondo');
    platforms=game.add.group();
    platforms.enableBody=true;
    var piso=platforms.create(0,game.world.height-64,'piso');
    piso.scale.setTo(2,2);
    piso.body.immovable=true;
    var ledge= platforms.create(400,400,'piso');
    ledge.body.immovable=true;
    ledge=platforms.create(-150,250,'piso');
    ledge.body.immovable=true;
    player = game.add.sprite(32, game.world.height - 150, 'jugador');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    //  Finally some paletas to collect
    paletas = game.add.group();

    //  We will enable physics for any paleta that is created in this group
    paletas.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a paleta inside of the 'paletas' group
        var paleta = paletas.create(i * 70, 0, 'paleta');

        //  Let gravity do its thing
        paleta.body.gravity.y = 300;

        //  This just gives each paleta a slightly random bounce value
        paleta.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

function update() {
}



