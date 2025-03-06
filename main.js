const larguraJogo = 700;
const alturaJogo = 850;

const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,
    backgroundColor: "#8EDEB2",
    pixelArt: true,
    roundPixel: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },
    scene: [ CenaUm, CenaDois],
};

const game = new Phaser.Game(config);

console.log(window.innerHeight)
console.log(window.innerWidth)