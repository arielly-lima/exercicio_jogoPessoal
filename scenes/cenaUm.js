class CenaUm extends Phaser.Scene{
   constructor() {
    super({ key: 'CenaUm' });

   }

   preload(){
    this.load.image('pato', 'assets/pato.png');


   }
   create(){
    this.add.image(larguraJogo / 2, alturaJogo / 1.6, 'pato').setScale(0.9);

    this.add.text(larguraJogo / 2, alturaJogo / 4, "Like a Duck!", {
        fontSize: '60px', 
        fill: '#495613',
    }).setOrigin(0.5, 0.5);

    let botaoComecar = this.add.text(larguraJogo / 2, alturaJogo / 1.2, "Clique para começar", {
            fontSize: '40px', 
            fill: '#495613',
        }).setOrigin(0.5, 0.5).setInteractive();

    botaoComecar.on('pointerdown', () => {
        window.location.href = 'cenaDois.js';
    });
    


    
   }

   update(){

   }

}