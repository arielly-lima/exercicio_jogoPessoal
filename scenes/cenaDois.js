class CenaDois extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaDois' });
    }

    preload() {
        this.load.spritesheet('pato2', 'assets/spritePato.png', { frameWidth: 320, frameHeight: 320 });
        this.load.image('abacate', 'assets/abacate.png');
        this.load.image('pitaia', 'assets/pitaia.png');
        this.load.image('morango', 'assets/morango.png');
    }

    create() {
        this.pontuacao = 0;

        this.pato = this.physics.add.sprite(larguraJogo / 2, 800, 'pato2').setScale(0.9);
        this.pato.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({ 
            key: 'direita', 
            frames: this.anims.generateFrameNumbers('pato2', { start: 3, end: 4 }), 
            frameRate: 10, repeat: -1 });

        this.anims.create({ 
            key: 'esquerda', 
            frames: this.anims.generateFrameNumbers('pato2', { start: 0, end: 1 }), 
            frameRate: 10, repeat: -1 });

        this.anims.create({ 
            key: 'parada', 
            frames: [{ key: 'pato2', frame: 2 }], 
            frameRate: 20 });

        this.morango = this.physics.add.sprite(larguraJogo / 1.4, -50, 'morango').setScale(0.02);
        this.pitaia = this.physics.add.sprite(larguraJogo / 2, -50, 'pitaia').setScale(0.02);
        this.abacate = this.physics.add.sprite(larguraJogo / 3.4, -50, 'abacate').setScale(0.02);

        this.placar = this.add.text(50, 60, 'Pontuação: ' + this.pontuacao, { 
            fontSize: '35px', 
            fill: '#495613',
        });

        this.physics.add.overlap(this.pato, this.morango, () => 
            this.coletarFruta(this.morango, 1));

        this.physics.add.overlap(this.pato, this.pitaia, () => 
            this.coletarFruta(this.pitaia, 5));

        this.physics.add.overlap(this.pato, this.abacate, () => 
            this.coletarFruta(this.abacate, 10));

        this.gameOverText = this.add.text(larguraJogo / 2, alturaJogo / 2, 'Game Over', { 
            fontSize: '75px',
            fill: '#495613',
        }).setOrigin(0.5, 0.5).setVisible(false);
    }

    coletarFruta(fruta, pontos) {
        fruta.setVisible(false);
        fruta.body.enable = false;
        
        let novaPosicaoX = Phaser.Math.RND.between(50, larguraJogo - 50);

        this.time.delayedCall(500, () => {
            fruta.setPosition(novaPosicaoX, -50);
            fruta.setVisible(true);
            fruta.body.enable = true;
            fruta.setVelocityY(Phaser.Math.RND.between(200, 600));
        });

        this.pontuacao += pontos;
        this.placar.setText('Pontuação: ' + this.pontuacao);
    }

    fimDoJogo() {
        this.physics.pause();
        this.pato.setTint(0xff0000);
        this.pato.anims.play('parada');
        this.gameOverText.setVisible(true);
    }

    update() {
        if (this.morango.y > 850 && this.pitaia.y > 850) {
            this.fimDoJogo();
        } else if (this.morango.y > 850 && this.abacate.y > 850) {
            this.fimDoJogo();
        }

        if (this.cursors.left.isDown) {
            this.pato.setVelocityX(-350);
            if (this.pato.anims.currentAnim?.key !== 'esquerda') {
                this.pato.anims.play('esquerda', true);
            }
        } else if (this.cursors.right.isDown) {
            this.pato.setVelocityX(350);
            if (this.pato.anims.currentAnim?.key !== 'direita') {
                this.pato.anims.play('direita', true);
            }
        } else {
            this.pato.setVelocityX(0);
            if (this.pato.anims.currentAnim?.key !== 'parada') {
                this.pato.anims.play('parada', true);
            }
        }
    }
}


