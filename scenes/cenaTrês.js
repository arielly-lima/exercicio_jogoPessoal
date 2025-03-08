class CenaTrês extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaTrês' }); // Define a chave da cena
    };

    preload() {
        // Carrega a segunda imagem de instrução
        this.load.image('instrução2', 'assets/instrucoes2.png');
    }

    create() {
        // Adiciona a imagem de instrução na tela
        this.add.image(larguraJogo / 2, alturaJogo / 1.9, 'instrução2').setScale(0.8);

        // Cria um botão interativo para começar o jogo
        let botaoComecar = this.add.text(larguraJogo / 2, alturaJogo / 1.09, "Começar", {
            fontSize: '35px', 
            fill: '#495613',
        }).setOrigin(0.5, 0.5).setInteractive();

        // Ao clicar no botão, inicia a próxima cena do jogo
        botaoComecar.on('pointerdown', () => {
            this.scene.start("CenaQuatro");
        });
    }

    //Função para tualizações na cena
    update() {
    
    }
}
