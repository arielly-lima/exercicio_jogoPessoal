class CenaDois extends Phaser.Scene{
    constructor() {
     super({ key: 'CenaDois' });
 
    }

    preload(){
        this.load.spritesheet('patoanimado', 'assets/spritePato.png');
    }

    create(){
    var pato = this.physics.add.sprite(larguraJogo / 2, 400, 'patoanimado');
        pato.setCollideWorldBounds(true);

        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('patoanimado', { start: 0, end: 4 }),
            frameRate: 8, // Velocidade da animação
            repeat: -1 // Loop infinito
            
        });
    }


    update(){

    }

}
