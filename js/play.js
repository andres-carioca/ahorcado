var play = {
    preload: function () {

        this.letter = '';

        this.acierto = false;
        this.fallos = 0;
        
        this.botonera=[];
        
   

        this.foo = '';

        this.alias = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        this.palabras = ['abstract', 'do', 'if', 'package', 'throw', 'boolean', 'double',
            'implements', 'private', 'throws', 'break', 'else', 'import', 'protected',
            'transient', 'byte', 'extends', 'in', 'public', 'true', 'case', 'false',
            'instanceof', 'return', 'try', 'catch', 'final', 'int', 'short', 'var',
	    'char', 'finally', 'interface', 'static', 'void', 'class', 'float', 'long',
            'super', 'while', 'const', 'for', 'native', 'switch', 'with', 'continue',
            'function', 'new', 'synchronized', 'default', 'goto', 'null', 'this'];

        game.load.image('horca', 'assets/img/horca.png');
        game.load.image('asustado', 'assets/img/asustado.png');
        game.load.image('feliz', 'assets/img/feliz.png');
        game.load.image('ahorcado', 'assets/img/titulo2.png');
        game.load.image('ganaste', 'assets/img/ganaste.png');
        game.load.image('cabeza', 'assets/img/cabeza.png');
        game.load.image('torso', 'assets/img/torso.png');
        game.load.image('base', 'assets/img/base.png');
        game.load.image('brazoIzq', 'assets/img/brazoIzq.png');
        game.load.image('brazoDer', 'assets/img/brazoDer.png');
        game.load.image('piernaIzq', 'assets/img/piernaIzq.png');
        game.load.image('piernaDer', 'assets/img/piernaDer.png');
        
        game.load.audio('fallo','assets/mp3/fallo.mp3');
        game.load.audio('acierto','assets/mp3/acierto.mp3');
     
       

        for (var i = 0; i < this.alias.length; i++)
            game.load.image(this.alias[i], 'assets/img/letras/' + this.alias[i] + '.png');


       

    },

    create: function () {
        
                
        this.crearHorca();

        this.crearSentenciado();

        this.elegirPalabra();

        this.dibujarGuiones();

        this.crearBotonera();



    },

    // ********************
    // Creación de la horca
    // ********************
    crearHorca: function () {


        horca = game.add.image(0, 20, 'horca');
        horca.width = 230;
        horca.height = 580;

    },


    // ***********************
    // Letra del boton pulsado
    // ***********************
    letra: function (boton) {

        this.letter = boton.key;
        boton.visible = false;

        console.log(this.letter);

        this.verificarLetra();

    },

    // *************************
    // Verificar letra ingresada
    // *************************

    verificarLetra: function () {

        for (var i = 0; i < this.palabra.length; i++) {

            if (this.letter.toLowerCase() == this.palabra[i]) {

                console.log("Acierto !!");
                
                game.add.audio('acierto').play();                
                
                this.acierto = true;



                var letra = game.add.image(300 + (i * 55), 225, this.letter);
                letra.width = 50;
                letra.height = 50;

            }


        }

        console.log(this.word);

        if (!this.acierto) {
            this.dibujarSentenciado();
            this.verificarAhorcado();
        }
        else {
            this.acierto = false;
            this.palabra =this.palabra.split(this.letter.toLowerCase()).join('-');
            this.verificarPalabra();
        }



    },
    
    // *******************
    // Verificar Ahorcado
    // *******************
    verificarAhorcado: function(){
        if(this.fallos==6){
            for(var i=0;i<this.botonera.length;i++){
                this.botonera[i].visible=false;
            }

            // Cambiamos la cara a 'cabeza' (muerto)
            this.man[0].loadTexture('cabeza');

            // Hacemos que todo el grupo del monigote se balancee parejo como un péndulo
            game.add.tween(this.manGroup).to({ rotation: 0.15 }, 800, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

            // Mostramos la imagen de perdiste (ahorcado) y la hacemos interactiva
            var imgPerdiste = game.add.image(350, 400, 'ahorcado');
            imgPerdiste.inputEnabled = true;
            imgPerdiste.events.onInputDown.add(this.irAIntro, this);
            
        }
    },

    // *******************
    // Verificar Palabra
    // *******************

    verificarPalabra: function () {
        console.log("verificarPalabra():", this.palabra);

        if (this.palabra == this.foo) {
            
            for(var i=0;i<this.botonera.length;i++){
                this.botonera[i].visible=false;
            }

            game.add.image(121, 147, 'feliz');
            
            var imgGanaste = game.add.image(350, 400, 'ganaste');
            imgGanaste.inputEnabled = true;
            imgGanaste.events.onInputDown.add(this.irAIntro, this);

        }

    },

    // *******************
    // Volver a la intro
    // *******************
    irAIntro: function () {
        game.state.start('intro'); 
    },




    // *******************
    // Dibujar sentenciado
    // *******************

    dibujarSentenciado: function () {

        console.log("Fallo");
        
        game.add.audio('fallo').play();
       
        this.man[this.fallos].visible = true;

        this.fallos++;
        console.log("cantidad de fallos: ", this.fallos);
        

    },



    // ************************
    // Creación del sentenciado
    // ************************

    crearSentenciado: function () {

        // Creamos un grupo contenedor ubicado en la posición inicial de la cabeza
        this.manGroup = game.add.group();
        this.manGroup.x = 121;
        this.manGroup.y = 147;

        this.man = [];

        // Las posiciones de las partes ahora son relativas a la posición del grupo (origen en la cabeza)
        this.man[0] = this.manGroup.create(0, 0, 'asustado');
        this.man[1] = this.manGroup.create(17, 113, 'torso');
        this.man[2] = this.manGroup.create(-8, 106, 'brazoIzq');
        this.man[3] = this.manGroup.create(72, 113, 'brazoDer');
        this.man[4] = this.manGroup.create(-18, 248, 'piernaIzq');
        this.man[5] = this.manGroup.create(76, 223, 'piernaDer');

        for (var i = 0; i < this.man.length; i++) {
            this.man[i].visible = false;
        }

    },


    // **********************
    // Elegir palabra al azar
    // **********************
    elegirPalabra: function () {

        var indice = Math.floor(Math.random() * 53);
        this.palabra = this.palabras[indice];
        
        console.log("palabra: ", this.palabra);



    },


    // *****************************
    // Dibujar espacios x cada letra
    // *****************************
    dibujarGuiones: function () {



        for (var i = 0; i < this.palabra.length; i++) {

            this.foo += '-';


            game.add.image(300 + (i * 55), 250, 'base');

        };




    },




    // ************************
    // Crear botones con letras
    // ************************
    crearBotonera: function () {


        var x = 0;
        var y = 380;

        for (var i = 0; i < this.alias.length; i++) {


            x = 330 + (i % 9) * 55;
            if (i % 9 == 0) y += 55;




            this.botonera[i]= game.add.button(x, y, this.alias[i], this.letra, this);
            this.botonera[i].width = 50;
            this.botonera[i].height = 50;

        }

    }

}