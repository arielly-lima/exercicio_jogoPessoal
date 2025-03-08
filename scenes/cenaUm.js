class CenaUm extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaUm' }); //Define a chave da cena
    };

    preload() {
        //Carrega as imagens do fundo e do pato
        this.load.image('pato', 'assets/pato.png');
        this.load.image('bg', 'assets/background.png');
    }

    create() {
        //Adiciona a imagem de fundo na posição central
        this.add.image(larguraJogo / 2, alturaJogo / 1.9, 'bg').setScale(0.8);

        //Adiciona a imagem do pato na tela
        this.add.image(larguraJogo / 2, alturaJogo / 1.6, 'pato').setScale(0.9);

        //Título do jogo
        this.add.text(larguraJogo / 2, alturaJogo / 4, "Like a Duck!", {
            fontSize: '50px', 
            fill: '#495613',
        }).setOrigin(0.5, 0.5);

        //Cria um botão de início interativo
        let botaoComecar = this.add.text(larguraJogo / 2, alturaJogo / 1.09, "Clique para começar", {
            fontSize: '35px', 
            fill: '#495613',
        }).setOrigin(0.5, 0.5).setInteractive();

        //Inicia a próxima cena ao clicar no botão
        botaoComecar.on('pointerdown', () => {
            this.scene.start("CenaDois");
        });
    }

    //Função para atualizções na cena
    update() {

    }
}
