var gameWidth = 1280;
var gameHeight = 720;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
//game.state.add('introduction', introductionState);
game.state.add('play', playState);
//game.state.add('win', winState);

game.state.start('boot');