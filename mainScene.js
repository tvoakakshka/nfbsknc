 

export default class mainScene extends Phaser.Scene {
    constructor(){
         super('mainScene')
        this.gound;
        this.platforms;
        this.cursor;
        this.player;
        this.enemyDirection = 'left';
        this.playerHealsh = 100;

        this.inventory = [];
        this.inventoryText;

        this.sword;
        this.poison;
    }
    preload(){
        this.load.image('sky', '../../assets/sky.jpg')
        this.load.image('ground', '../../assets/ground.jpg')
        this.load.image('platform', '../../assets/platform.png')
        this.load.image('sword', '../../assets/sword.png')
        this.load.image('poison', '../../assets/poison.jpg')

        this.load.spritesheet('player', '../../assets/player/player.png',{frameWidth: 32, frameHeight: 33})
        this.load.spritesheet('enemy', '../../assets/enemy/enemy.png',{frameWidth: 32, frameHeight: 33})

        this.load.audio('backgroundMusic', '../../assets/music.mp3')
    }
    create(){
        // this.movingPlatformss = this.physics.add.group({
        //      allowGravity:false,
        //      immovable: true
        // });
        // this.movingPlatform1 = this.movingPlatformss.create(200,400 'platform');
        // this.movingPlatform2 = this.movingPlatforms.create(600,250,'platform');
        // this.movingPlatform1.body.setVelocity.x = 100;
        // this.movingPlatform1.body.setVelocity.y = 50;
        // this.movingPlatform2.body.setVelocity.x = 150;
        // this.movingPlatform2.body.setVelocity.y = 75;
        // this.physics.add.collider(this.player,this.movingPlatforms);
    
        this.createHealthBar()
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
            });
            this.anims.create({
                key: 'attack',
                frames: this.anims.generateFrameNumbers('player', {
                    start: 1,
                    end: 3
                }),
                frameRate: 10,
                repeat: 0
            });
        this.ground = this.physics.add.staticGroup()//
        this.add.image(400, 150, 'sky')
        this.ground.create(400, 600, 'ground')
        this.platforms = this.physics.add.staticGroup()//
        this.platforms.create(200, 150, 'platform')
        this.platforms.create(600, 300, 'platform')
        this.platforms.create(110, 300, 'platform')
        this.platforms.create(550, 400, 'platform')
        this.player = this.physics.add.sprite(100, 350, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.2)
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.ground)
        this.sword = this.add.sprite(0,0, 'sword');
        this.sword.setVisible(false);
        this.poison = this.physics.add.sprite(500, 100, 'poison');
        this.physics.add.collider(this.poison, this.ground);

        this.physics.add.overlap(this.player,this.poison,this.collectItem, null, this)
        this.player.sword = this.sword;
        this.sword.setOrigin(0.5,1)
        this.sword.setRotation(Phaser.Math.DegToRad(0));
        this.anims.create({
            key: 'runEnemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
    
        })

        // this.backgroundMusic = this.sound.add("backgroundMusic")
        // this.backgroundMusic.play({ loop: true});
this.enemy = this.physics.add.sprite(500, 300, 'enemy')
    this.enemy.setCollideWorldBounds(true)
    this.enemy.setBounce(0.2)
    this.physics.add.collider(this.enemy, this.platforms)
    this.physics.add.collider(this.enemy, this.ground)
this.physics.add.overlap(this.player, this.enemy, this.attackEnemy,null, this);
}
// this.inventoryText = this.add.text(10,50, 'Inventory'), {
//     font: '16px Arial',
//     fill: '#ffffff'
// }};
createHealthBar() {
    this.healthBar = this.add.graphics();
    this.updateHealthBar();
}
updateHealthBar() {
if (this.playerHealsh <= 0) {
    this.playerHealsh = 0;
}


const x = 10;
const y = 10;
const width = 200;
const height = 20;


this.healthBar.clear();
this.healthBar.fillStyle(0x177245);
this.healthBar.fillRect(x, y, width * (this.playerHealsh / 100), height);
this.healthBar.lineStyle(2, 0x00000);
this.healthBar.strokeRect(x, y, width, height);
}
handleCollision() {
    this.playerHealsh -=0.01;

    if (this.playerHealsh <=0) {

        this.restartGame();
    }

    this.createHealthBar();
}
    restartGame() {
        this.playerHealsh = 50;
        this.scene.restart();
    }
attackEnemy(player, enemy) {
if (this.cursor.space.isDown) {

enemy.disableBody(true, true)

}
}
collectItem(player, item) {
    item.disableBody(true, true);
    this.inventory.push(item.texture.key)
    this.updateInventoryDisplay();
}
updateInventoryDisplay() {
    //this.inventoryText.setText('Inventory');
    this.inventory.forEach((item, index) => {
        if (item === 'poison') {
        //const itemTmage = this.add.image(100 = index * 40, 60, item);
        //itemTmage.setScale(1);
        }
    });
}
     update(){
    //     this.movingPlatform1.x= Phaser.Math.Sinusoidal.lnOut(this * 0.005,200,200);
    //     this.movingPlatform1.y = Phaser.Math.Sinusoidal.Out(time * 0.0025,400,100);

    //     this.movingPlatform2.x= Phaser.Math.Sinusoidal.Out(this * 0.0075,600,200);
    //     this.movingPlatform2.y= Phaser.Math.Sinusoidal.lnOut(this * 0.0035,250,100);
    // }
this.physics.add.overlap(this.sword, this.enemy, this.attackEnemy)


        this.physics.add.overlap(this.player, this.enemy, this.handleCollision, null, this);
        if (this.cursor.left.isDown){
            this.player.setVelocityX(-160)
            this.player.anims.play('run', true); 
            this.player.flipX = true;
        }
        else if (this.cursor.right.isDown){
            this.player.setVelocityX(160)
            this.player.anims.play('run', true);
            this.player.flipX = false;
        }
        else {
            this.player.setVelocityX(0) 
            this.player.anims.stop('run'); 
            this.player.setTexture("player", 0);
        }

        if (this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330)

            }

            if (this.enemyDirection == 'right') {
                this.enemy.setVelocityX(80);
                this.enemy.flipX = false;
                this.enemy.anims.play("runEnemy", true);
            } else if  (this.enemyDirection == 'left') {
                this.enemy.setVelocityX(-80);
                this.enemy.flipX = true;
                this.enemy.anims.play('runEnemy',true);
            }
            if (this.enemy.body.blocked.right) {
                this.enemyDirection = 'left';
            } else if (this.enemy.body.blocked.left) {
                this.enemyDirection = 'right';

            }
     
    if (this.player.flipX = false) {
                this.sword.setPosition(this.player.x+10, this.this.y+8);
                this.sword.flipX = false
    }
else{
  // this.sword.setPosition(this.player.x-10, )
  // this.sword.flipX = true
    }
if (this.sword.flipX == this){
this.sword.setRotation(this.sword.rotation - 0.5);
  const angle = this.sword.rotation;  
    console.log(angle)
    if (angle > 2){
    }
}
 if (this.cursor.space.isDown) {

    this.player.anims.play('attack', true);
    this.sword.setVisible(true);
    if (this.sword.flipX == true){
        this.sword.setRotation(this.sword.rotation - 0.1);
        const  angle = this.sword.rotation;
        console.log(angle)
        if (angle > 2 ){
            this.sword.setRotation(Phaser.Math.DegToRad(0));


        }
    }
    else{
        this.sword.setRotation(this.sword.rotation +0.1);
        const angle = this.sword.rotation;

    if (angle> 2){
    this.sword.setRotation(Phaser.Math.DegToRad(0));


    }
    }
    }else{
    this.sword.setVisible(false);
    this.sword.setRotation(Phaser.Math.DegToRad(0))
    }
}
}
