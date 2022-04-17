class Fly extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed * 2;
        this.frameNum = 15;
        this.moveDown = false;
        this.initY;
        this.toungeSpeed = 10;
    }

    update(){
        if(!this.moveDown){
            this.initY = this.y;
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width){
                this.x = game.config.width;
                //this.y = Phaser.Math.RND.pick(borderUISize*4, borderUISize*5, borderPadding*4);
                this.y = Phaser.Math.RND.between(borderUISize*4, borderUISize*6 + borderPadding*4);
            }
            
            this.frameNum++;
            if(this.frameNum % 2 == 0){
                this.anims.play('flyAnim'); 
            }
        }
        else{
            this.y += this.toungeSpeed;
            if(this.y >= game.config.height - borderUISize - borderPadding){
                this.moveDown = false;
                this.resetting = false;
                //this.y = this.initY;
                this.y = Phaser.Math.RND.pick(borderUISize*4, borderUISize*5, borderPadding*4);
                this.reset();
              }
        }
    }

    reset(){
        this.x = game.config.width;
    }
}