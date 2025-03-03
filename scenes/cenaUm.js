class CenaUm extends Phaser.Scene{
   constructor() {
    super({ key: "CenaUm" });

   }

   preload(){
    this.load.image('pato', 'assets/bg.png');

   }
   create(){
    this.add.image(width/ 2, height/ 2, 'pato');


   }

   update(){

   }

}
