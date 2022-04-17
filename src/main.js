/*
    Sophie Martin
    Rocket Patrol Mod
    4/17/22
    Took roughly 3 days to complete
    Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
    Add your own (copyright-free) background music to the Play scene (5)
    Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
    Create a new animated sprite for the Spaceship enemies (10)
    Implement the speed increase that happens after 30 seconds in the original game (5)
*/

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
let music;