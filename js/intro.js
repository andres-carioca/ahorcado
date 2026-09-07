var intro={
    preload: function(){
        
        game.load.image('horca','assets/img/ahorcado.png');
        game.load.image('murcielago','assets/img/murcielago.png');
        game.load.image('titulo','assets/img/titulo.png');
        
        game.load.audio('ambiental','assets/mp3/ambiental.mp3');
        
    },
    create: function(){
        
        game.add.image(700,20,'murcielago');
        game.add.image(0,20,'horca');
        game.add.image(200,275,'titulo');
        
        game.add.audio('ambiental').loopFull();
        
        
        
        
    },
    update:function(){
        
      if(game.input.activePointer.isDown)game.state.start('play');
        
    }
        
};