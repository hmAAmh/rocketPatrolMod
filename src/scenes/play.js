class Play extends Phaser.Scene{
    constructor(){
        super("play");
    }

    preload() {


        
    }

    

    create(){

          // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
       
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        }); 

        this.anims.create({
            key: 'dragonFly',
            frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 1, first: 0}),
            frameRate: 60
        }); 
        
        // add rocket (p1)
        this.pad = new lilyPad(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'lily').setOrigin(0.5, 0.75);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0.75);
      
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'dragonFly', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'dragonFly', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'dragonFly', 0, 10).setOrigin(0,0);
    


        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.leaves = new topLeaves(this, 0, borderUISize - 4, 'leavesBackground', 0, 10).setOrigin(0,0);
        //switch1 = this.physics.add.staticSprite(707, 420, 'leaves');
        // white borders
        this.logTop = new topLeaves(this, 0, borderUISize, 'logRightSpr', 0, 10).setOrigin(0);
        this.logTop.angle -= 90;
        this.logBottom = new topLeaves(this, game.config.width, game.config.height - borderUISize, 'logRightSpr', 0, 10).setOrigin(0);
        this.logBottom.angle += 90;
        this.logLeft = new topLeaves(this, 0  - borderUISize * 2, 0, 'logRightSpr', 0, 10).setOrigin(0);
        this.logLeft.flipX = true;

        this.logRight = new topLeaves(this, game.config.width - borderUISize, 0, 'logRightSpr', 0, 10).setOrigin(0,0);



        // initialize score
        this.p1Score = 0;   
        // display score
        let scoreConfig = {
            fontFamily: 'Seoge Print',
            fontSize: '24px',
            //backgroundColor: '#F3B141',
            color: '#31870A',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreDraw = new topLeaves(this, borderUISize + borderPadding, borderUISize + borderPadding*2, 'scoreSpr', 0, 10).setOrigin(0);
        this.scoreLeft = this.add.text(borderUISize + borderPadding*4, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOverDraw = new topLeaves(this, game.config.width / 2, game.config.height / 2 + borderUISize, 'gameOverSpr', 0, 10).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.tounge = this.add.rectangle(this.p1Rocket.x, this.pad.y, 5, this.p1Rocket.y - this.pad.y, 0xFFFFFF).setOrigin(0, 0);
        this.pad.depth = 1;
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            music.stop();
            this.scene.start("menu");
        }

        this.bg.tilePositionX -= 4;
        if (!this.gameOver) {  
            this.tounge.destroy();
            this.tounge = this.add.rectangle(this.p1Rocket.x, this.pad.y, 5, this.p1Rocket.y - this.pad.y, 0xFF0000).setOrigin(0, 0);             
            this.p1Rocket.update();         // update rocket sprite
            //this.pad.update(); 
            this.pad.x = this.p1Rocket.x;
            
            
            //player.setPosition(this.pad.x, this.pad.y);
            //frogPos.draw(frog);

            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 

        // check collisions
        if(!this.p1Rocket.resetting){
            if(this.checkCollision(this.p1Rocket, this.ship03) && !this.ship03.moveDown) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship03);   
            }
            if (this.checkCollision(this.p1Rocket, this.ship02) && !this.ship02.moveDown) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship02);   
            }
            if (this.checkCollision(this.p1Rocket, this.ship01) && !this.ship01.moveDown) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship01);   
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // score add and repaint*/
        ship.x = this.p1Rocket.x - 16;
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion'); 
        
        ship.moveDown = true;
      }
}