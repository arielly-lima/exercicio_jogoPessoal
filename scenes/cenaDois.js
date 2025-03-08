class CenaDois extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaDois' }); // Define a chave da cena
    };

    preload() {
        // Carrega a imagem de instrução
        this.load.image('instrução1', 'assets/instrucoes.png');
    }

    create() {
        // Adiciona a imagem de instrução na tela
        this.add.image(larguraJogo / 2, alturaJogo / 1.9, 'instrução1').setScale(0.8);

        // Cria um botão interativo para continuar
        let botaoComecar = this.add.text(larguraJogo / 2, alturaJogo / 1.09, "Continuar", {
            fontSize: '35px', 
            fill: '#495613',
        }).setOrigin(0.5, 0.5).setInteractive();

        // Ao clicar no botão, inicia a próxima cena
        botaoComecar.on('pointerdown', () => {
            this.scene.start("CenaTrês");
        });
    }

    //Função para atualizações na cena
    update() {
    
    }
}
