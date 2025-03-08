class CenaQuatro extends Phaser.Scene {
    constructor() {
        super({ key: 'CenaQuatro' }); // Chave da cena

        this.pontuacao = 0; // Variável para pontuação do jogador
        this.tempoRestante = 30; // Variável para o tempo de jogo
    }

    preload() { // Função que carrega os assets do jogo
        this.load.spritesheet('pato2', 'assets/spritePato.png', { 
            frameWidth: 320, // Largura do frame do sprite
            frameHeight: 320 // Altura do frame do sprite
        });
        
        // Carrega as imagens dos objetos do jogo
        this.load.image('abacate', 'assets/abacate.png');
        this.load.image('pitaia', 'assets/pitaia.png');
        this.load.image('morango', 'assets/morango.png');
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('bg', 'assets/background.png');
        this.load.image('pato', 'assets/pato.png');
    }

    create() { // Função que cria os elementos do jogo
        // Adiciona a imagem de fundo ao jogo
        this.add.image(larguraJogo / 2, alturaJogo / 1.6, 'bg').setScale(0.8);

        // Criação do personagem principal (pato)
        this.pato = this.physics.add.sprite(150, 450, 'pato2').setScale(0.20);
        this.pato.body.setGravityY(300); // Define a gravidade que afeta o personagem
        this.pato.setBounce(0.2); // Adiciona um pequeno efeito de quique ao personagem

        // Criando um grupo de "filhos" (pequenos patos)
        this.filhos = this.physics.add.group({
            key: 'pato', // Usa a imagem do pato como base
            repeat: 1, // Define a quantidade de filhos gerados
            setScale: { x: 0.15, y: 0.15 }, // Ajusta a escala dos filhos
            setXY: { x: 430, y: 50, stepX: 40 } // Define a posição inicial dos filhos
        });

        // Itera sobre cada "filho" para definir propriedades específicas
        this.filhos.children.iterate(filhos => {
            filhos.body.debugShowBody = false; // Oculta a visualização do corpo de colisão no modo debug
        });
    
        // Criando frutas para coletar
        this.morango = this.physics.add.sprite(larguraJogo / 1.4, -50, 'morango').setScale(0.008);
        this.morango.debugShowBody = false; // Oculta hitbox no modo debug

        this.pitaia = this.physics.add.sprite(larguraJogo / 2, -50, 'pitaia').setScale(0.008);
        this.pitaia.debugShowBody = false;

        this.abacate = this.physics.add.sprite(larguraJogo / 3.4, -50, 'abacate').setScale(0.008);
        this.abacate.debugShowBody = false;

        // Criando interface gráfica (placar e tempo)
        this.placar = this.add.text(50, 60, 'Frutas: ' + this.pontuacao, { 
            fontSize: '35px', 
            fill: '#495613' // Cor do texto
        });

        this.textoTempo = this.add.text(50, 20, 'Tempo: ' + this.tempoRestante, {
             fontSize: '35px', 
             fill: '#ff0000' // Cor do texto
        });

        // Criando plataformas para o jogo
        this.platforms = this.physics.add.staticGroup(); // Grupo de plataformas estáticas

        // Array com posições predefinidas das plataformas
        let plataformasPosicoes = [
            { x: 150, y: 550 },
            { x: 400, y: 470 },
            { x: 650, y: 310 },
            { x: 190, y: 260 },
            { x: 450, y: 130 },
        ];

        // Criação das plataformas com base no array de posições
        plataformasPosicoes.forEach(pos => {
            let plataforma = this.platforms.create(pos.x, pos.y, 'plataforma');
            plataforma.setScale(0.45).refreshBody(); // Ajusta a escala e atualiza o corpo de colisão
        });

        // Itera sobre todas as plataformas para ocultar a hitbox no modo debug
        this.platforms.children.iterate(plataforma => {
            plataforma.body.debugShowBody = false;
        });

        // Adicionando colisões
        this.physics.add.collider(this.pato, this.platforms);
        this.physics.add.collider(this.morango, this.platforms);
        this.physics.add.collider(this.abacate, this.platforms);
        this.physics.add.collider(this.pitaia, this.platforms);
        this.physics.add.collider(this.filhos, this.platforms);

        // Adicionando eventos de sobreposição
        this.physics.add.overlap(this.pato, this.morango, () => 
            this.coletarFruta(this.morango, 1)); //Chama a função coletar frutas, com a fruta sendo morango e a pontuação sendo 1

        this.physics.add.overlap(this.pato, this.pitaia, () => 
        this.coletarFruta(this.pitaia, 5)); //Chama a função coletar frutas, com a fruta sendo pitaia e a pontuação sendo 5
        
        this.physics.add.overlap(this.pato, this.abacate, () =>
        this.coletarFruta(this.abacate, 10)); //Chama a função coletar frutas, com a fruta sendo abacate e a pontuação sendo 10

        this.physics.add.overlap(this.pato, this.filhos, () => 
        this.vitoria()); //Chama a função vitória

        // Criação do texto caso o jogador vença
        this.vitoriaText = this.add.text(larguraJogo / 2, alturaJogo / 2, 'Vitória', { 
            fontSize: '75px', fill: '#495613' 
        }).setOrigin(0.5).setVisible(false);

        //Criação do texto caso o jogador perca (game over)
        this.gameOverText = this.add.text(larguraJogo / 2, alturaJogo / 2, 'Game Over', {
             fontSize: '75px', fill: '#495613' 
        }).setOrigin(0.5).setVisible(false);

        // Criando o evento do contador de tempo
        this.timerEvento = this.time.addEvent({
            delay: 1000, //A função será atualizada a cada 1 segundo
            callback: this.atualizarTempo, 
            callbackScope: this, //Define o escopo para callback, garantindo que a função ocorra na cenaDois
            loop: true //Evento ocorre infinitamente até ser removido
        });

        // Adicionando as teclas do teclado para controle
        this.cursors = this.input.keyboard.createCursorKeys();

        //Animação para esquerda
        this.anims.create({
        key: 'left', // Nome da animação
        frames: this.anims.generateFrameNumbers('pato2', { start: 0, end: 1 }), // Usa os frames 0 e 1 do sprite 'pato2'
        frameRate: 10, // Velocidade da animação (10 quadros por segundo)
        repeat: -1 // A animação se repete indefinidamente
    });

        //Animação de pulo
        this.anims.create({
        key: 'turn',
        frames: [{ key: 'pato2', frame: 2 }],
        frameRate: 20
    });

        //Animação para direita
        this.anims.create({
        key: 'right', 
        frames: this.anims.generateFrameNumbers('pato2', { start: 3, end: 4 }),
        frameRate: 10, 
        repeat: -1
    });

        //Animação quando o pato está parado
        this.anims.create({
        key: 'parada',
        frames: [{ key: 'pato2', frame: 2 }], 
        frameRate: 20 
        });
    }

        // Atualiza o tempo restante do jogo
        atualizarTempo() {
            this.tempoRestante--; // Diminui o tempo em 1 segundo
            this.textoTempo.setText('Tempo: ' + this.tempoRestante); // Atualiza o texto na tela
    
            if (this.tempoRestante <= 0) {
                this.fimDoJogo(); // Se o tempo acabar, chama a função de fim de jogo
            }
        }
    
        // Função para coletar frutas e atualizar a pontuação
        coletarFruta(fruta, pontos) {
            fruta.setVisible(false); // Esconde a fruta coletada
            fruta.body.enable = false; // Desativa a física da fruta
    
            let novaPosicaoX = Phaser.Math.RND.between(50, larguraJogo - 50); // Gera uma nova posição aleatória para a fruta
    
            this.time.delayedCall(500, () => { // Aguarda 0.5 segundos antes de reposicionar a fruta
                fruta.setPosition(novaPosicaoX, -50); // Reposiciona a fruta no topo da tela
                fruta.setVisible(true); // Torna a fruta visível novamente
                fruta.body.enable = true; // Reativa a física da fruta
                fruta.setVelocityY(Phaser.Math.RND.between(200, 600)); // Define uma velocidade aleatória para a queda da fruta
            });
    
            this.pontuacao += pontos; // Adiciona os pontos à pontuação do jogador
            this.placar.setText('Frutas: ' + this.pontuacao); // Atualiza o placar na tela
        }
    
        // Função quando o jogador vence
        vitoria() {
            this.physics.pause(); // Pausa todas as interações físicas
            this.pato.anims.play('parada'); // Define a animação do pato como parado
            this.textoTempo.setVisible(false); // Esconde o contador de tempo
            this.vitoriaText.setVisible(true); // Exibe a mensagem de vitória
            this.timerEvento.remove(); // Remove o evento de contagem do tempo
        }
    
        // Função quando o jogador perde o jogo
        fimDoJogo() {
            this.physics.pause(); // Pausa todas as interações físicas
            this.pato.setTint(0xff0000); // Altera a cor do pato para vermelho (indicando derrota)
            this.pato.anims.play('parada'); // Define a animação do pato como parado
            this.textoTempo.setVisible(false); // Esconde o contador de tempo
            this.gameOverText.setVisible(true); // Exibe a mensagem de Game Over
        }
    
        // Atualiza a lógica do jogo a cada frame
        update() {
            if (this.pato.y > 850) { // Se o pato cair da tela, o jogo acaba
                this.fimDoJogo();
            }
    
            if (this.cursors.left.isDown) { // Se a seta para a esquerda for pressionada
                this.pato.setVelocityX(-160); // Velocidade para esquerda
                this.pato.anims.play('left', true); // Ativa a animação de movimento para a esquerda

            } else if (this.cursors.right.isDown) { // Se a seta para a direita for pressionada
                this.pato.setVelocityX(160); // Move o pato para a direita
                this.pato.anims.play('right', true); // Ativa a animação de movimento para a direita

            } else { // Se nenhuma tecla for pressionada
                this.pato.setVelocityX(0); // O pato para de se mover

                this.pato.anims.play('turn'); // Ativa a animação de parado
            }
    
            if (this.cursors.up.isDown && this.pato.body.touching.down) { // Se a seta para cima for pressionada e o pato estiver no chão
                this.pato.setVelocityY(-550); // Faz o pato pular
            }
        }
}
    