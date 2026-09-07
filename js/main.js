var game = new Phaser.Game(970,600,Phaser.CANVAS,'');

game.state.add('intro',intro);
game.state.add('play',play);

game.state.start('intro');

