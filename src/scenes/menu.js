class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }

    preload() {
        this.musicPlaying = false;
        // load audio
        this.load.audio('sfx_select', './assets/menu.mp3');
        this.load.audio('sfx_explosion', './assets/fly.mp3');
        this.load.audio('sfx_rocket', './assets/frog.mp3');
        this.load.audio('bgm', './assets/frogMaster.mp3');

        this.load.image('starfield', './assets/starfield.png');
        this.load.image('rocket', './assets/blank.png');
        this.load.image('lily', './assets/padFrog.png');
        this.load.image('leavesBackground', './assets/leaves.png');
        this.load.image('menuSpr', './assets/menu.png');
        this.load.image('gameOverSpr', './assets/gameOver.png');
        this.load.image('scoreSpr', './assets/score.png');
        this.load.image('logRightSpr', './assets/logRight.png');
        //this.load.image('spaceship', './assets/spaceship.png');
        this.load.spritesheet('spaceship', './assets/spaceship.png', {frameWidth: 48, frameHeight: 64, startFrame: 0, endFrame: 1});

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    //let music;
    
    create(){
        music = this.sound.add('bgm');
        //music.stop();
        music.setLoop(true);
        if(!music.isPlaying) {
        
          music.play();
          //this.musicPlaying = true;
        }
        
        music.volume -= 0.7;

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        this.leaves = new topLeaves(this, 0, borderUISize - 4, 'leavesBackground', 0, 10).setOrigin(0,0);

        this.logTop = new topLeaves(this, 0, borderUISize, 'logRightSpr', 0, 10).setOrigin(0);
        this.logTop.angle -= 90;
        this.logBottom = new topLeaves(this, game.config.width, game.config.height - borderUISize, 'logRightSpr', 0, 10).setOrigin(0);
        this.logBottom.angle += 90;
        this.logLeft = new topLeaves(this, 0  - borderUISize * 2, 0, 'logRightSpr', 0, 10).setOrigin(0);
        this.logLeft.flipX = true;
        this.logRight = new topLeaves(this, game.config.width - borderUISize, 0, 'logRightSpr', 0, 10).setOrigin(0,0);

        this.menuDraw = new topLeaves(this, game.config.width / 2, game.config.height / 2 + borderUISize, 'menuSpr', 0, 10).setOrigin(0.5);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width / 2, game.config.height / 2, `Use ←→ to move & (F) to fire`, menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        //this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('play');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000      
          }
          this.sound.play('sfx_select');
          this.scene.start('play');    
        }

        this.bg.tilePositionX -= 4;
      }
}