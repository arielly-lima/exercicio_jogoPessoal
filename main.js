const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#c1a0e0",
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
    scene: [CenaUm, CenaDois],
};

const game = new Phaser.Game(config);