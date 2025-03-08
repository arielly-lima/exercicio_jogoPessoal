const larguraJogo = 800; // Define variáveis para a largura da tela do jogo
const alturaJogo = 600; // Define variáveis para a altura da tela do jogo

const config = {
    type: Phaser.AUTO, // Define o renderizador do jogo (WebGL ou Canvas automaticamente)
    width: larguraJogo, // Define a largura do jogo
    height: alturaJogo, // Define a altura do jogo
    backgroundColor: "#8EDEB2", // Define a cor de fundo do jogo
    pixelArt: true, // Mantém a aparência pixelada dos sprites
    roundPixel: false, // Define se os pixels serão arredondados ou não
    
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta o jogo para caber na tela mantendo a proporção
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o jogo na tela
    },
    
    physics: {
        default: "arcade", // Define o motor de física como "arcade" (simples e eficiente)
        arcade: {
            gravity: { y: 400 }, // Aplica gravidade no eixo Y para os objetos
            debug: true // Ativa a exibição dos corpos de colisão para depuração
        }
    },
    
    scene: [CenaUm, CenaDois, CenaTrês, CenaQuatro], // Define as cenas do jogo
};

const game = new Phaser.Game(config); // Configura o jogo de acordo com phaser.Game