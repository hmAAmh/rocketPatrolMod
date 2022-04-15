// Rocket prefab
class lilyPad extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);             //add to existing, displayList, updateList
      //this.moveSpeed = 4;                   //pixels per frame
    }

    update(){
      // left / right movement
      /*    if(keyLEFT.isDown && this.x >= borderUISize + this.width){
              this.x -= this.moveSpeed;
          }
          else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x += this.moveSpeed; 
          }*/
      //this.x = newX;
    }

  }

  