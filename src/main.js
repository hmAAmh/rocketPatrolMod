console.log("different now");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [menu, Play]
};

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;


let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;