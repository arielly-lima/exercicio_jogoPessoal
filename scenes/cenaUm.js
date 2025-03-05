class CenaUm extends Phaser.Scene{
   constructor() {
    super({ key: 'CenaUm' });

   }

   preload(){
    this.load.image('pato', 'assets/pato.png');


   }
   create(){

    //funcao para criar uma hitbox retangular
function createButton(graphics, x, y, width, height, funcao) {
    //cria o retangulo
    graphics.setInteractive(
      (this.retangulo = new Phaser.Geom.Rectangle(x, y, width, height)),
      Phaser.Geom.Rectangle.Contains
    );
    //realizar funcao ao clicar na hitbox
    graphics.on("pointerdown", funcao);
    //ativa o debug
    graphics.strokeRectShape(this.retangulo);
  }


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
        this.scene.start("CenaDois");
    });
    


    
   }

   update(){

   }

}