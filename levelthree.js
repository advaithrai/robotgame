
var level = 3;
var centerX = 1500/2, centerY = 1000/2, speed = 8, velocity = 1000, t;
var player, collisionRate = 200, nextDamage = 0, health;
var zombie, zombieGroup, stepLimit = 150, stepCount = 0;
var platform, platformGroup, boxGroup, touchObject = false;
var bullets, bullet, nextFire = 0, fireRate = 200, gearCnt = 5, ammoScore;
var gears, gear, gearCnt = 0, gearScore;
var technoMusic, zombieNoises;

test.levelthree = function() {};


test.levelthree.prototype = {
    
     preload: function(){
         game.load.image('night', 'assets/backgrounds/buildings.png');
         game.load.image('platform', 'assets/sprites/platform.png');
         game.load.image('gear', 'assets/sprites/gear.png');
         game.load.image('box', 'assets/sprites/box.png');
         
         game.load.spritesheet('player', 'assets/spritesheets/robotnew.png', 121, 200);
         game.load.spritesheet('zombie', 'assets/spritesheets/zombie.png', 120, 191);
         game.load.image('bullet', 'assets/sprites/bullet.png');
         game.load.audio('laser', ['assets/sounds/laser.mp3','assets/sounds/laser.ogg','assets/sounds/laser.wav']);
         game.load.audio('techno', ['assets/sounds/techno.mp3','assets/sounds/techno.wav','assets/sounds/techno.m4a','assets/sounds/techno.ogg',]);
         game.load.audio('zombies', ['assets/sounds/zombies.mp3','assets/sounds/zombies.wav','assets/sounds/zombies.m4a','assets/sounds/zombies.ogg',]);
         
     },
    
     create: function() {
         
         //game setup
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
        game.stage.backgroundColor = '#3269a8';
        game.world.setBounds(0,650,3000,1686);
         
        var background = game.add.sprite(0,0, 'night');
        platform = game.add.sprite(1550,1390, 'platform');
        platformGroup = game.add.group();
        platformGroup.create(65, 1325, 'platform');
         platformGroup.create(280, 1325, 'platform');
         platformGroup.create(250, 1325, 'platform');
         platformGroup.create(480, 1325, 'platform');
         platformGroup.create(975, 1123, 'platform');
         platformGroup.create(1100, 1123, 'platform');
        platformGroup.create(1670, 1390, 'platform');
         platformGroup.create(2055, 1530, 'platform');
         platformGroup.create(2255, 1530, 'platform');
         platformGroup.create(2455, 1530, 'platform');
         platformGroup.create(2650, 1127, 'platform');
         platformGroup.create(2760, 1127, 'platform');
         
 
        boxGroup = game.add.group();
      
        boxGroup.create(2200, 1400, 'box');
         
         //gears setup
         gears = game.add.group();
         gears.enableBody = true;
         gears.physicsBodyType = Phaser.Physics.ARCADE;
         gears.create(1100,900, 'gear');
         gears.create(1630, 1230, 'gear');
         gears.create(2340, 1450, 'gear');
       25
         //zombie setup
        
        zombieGroup = game.add.group();
        zombieGroup.enableBody = true;
        zombieGroup.physicsBodyType = Phaser.Physics.ARCADE;     
        zombieGroup.create(1000, centerY + 430, 'zombie');
        zombieGroup.create(2450, 500, 'zombie');
         zombieGroup.create(1600, centerY + 260, 'zombie');
        zombieGroup.create(2590, centerY + 260, 'zombie');
        zombieGroup.setAll("body.gravity.y", 400);
        zombieGroup.setAll("body.collideWorldBounds", true);
        zombieGroup.setAll("body.velocity.x", 100);
        zombieGroup.setAll("scale.x", -1);
        zombieGroup.setAll("scale.y", 1);
        
         //bullets setup
         bullets = game.add.group();
         bullets.enableBody = true;
         bullets.physicsBodyType = Phaser.Physics.ARCADE;
         bullets.createMultiple(10,'bullet');
         
         bullets.setAll('checkWorldBounds',  'true');
         bullets.setAll('outOfBoundsKill', true);
        bullets.setAll("scale.x", 2);
        bullets.setAll("scale.y", 2);

         
         //player setup
        player = game.add.sprite(centerX - 600, centerY + 600,'player');
        player.anchor.setTo(0.5,0.1);
        player.scale.setTo(1.25,1.25);
         
        game.physics.enable([player, platform, platformGroup, boxGroup]);
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;
         
        player.animations.add('walk', [1,2,3,4]);
        player.animations.add('jump', [14,15,16]);
        player.animations.add('shoot', [17,18]);
        player.animations.add('die',[19,20,21,22,23,24,25,26,27]);
        
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 500, 200, 900,1000);
        
        
        health = game.add.text(1200,10, 'Robot Health: ' + player_health, {fontSize: 500, fill:'#DA420A'});
        health.fixedToCamera = true;
        health.cameraOffset.setTo(1200,10);
         
        gearScore = game.add.text(1200,40, 'Gears Collected: ' + gearCnt, {fontSize: 500, fill:'#f0ec2b'});
        gearScore.fixedToCamera = true;
        gearScore.cameraOffset.setTo(1200,40);
         
        ammoScore = game.add.text(1200,70, 'Ammo: ' + ammo, {fontSize: 500, fill:'#f0ec2b'});
        ammoScore.fixedToCamera = true;
        ammoScore.cameraOffset.setTo(1200,70);


         
        platform.body.immovable = true;
        platformGroup.setAll('body.immovable', true);
        boxGroup.setAll('body.immovable', true);
         
        technoMusic = game.add.audio('techno');
        technoMusic.play();
        zombieNoises = game.add.audio('zombies');
        zombieNoises.play();
         
        
     },
    
     update: function() {

         
         //player mechanics
         game.physics.arcade.collide(player,[platform, platformGroup, boxGroup], function() {
             touchObject = true;
         });
         
         
        //player controls
        if (game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.activePointer.isDown){ 
         if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        player.x += speed; 
        player.scale.setTo(1.25,1.25);
   
        player.animations.play('walk', 12, true);
     }
         
         if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
             
        player.x -= speed;
        player.scale.setTo(-1.25,1.25);
   
        player.animations.play('walk', 12, true);
     }
         if (game.input.activePointer.isDown && ammo > 0) {
        //     if ((game.input.mousePointer.x >= player.x && player.scale.x > 0) || (game.input.mousePointer.x <= player.x && player.scale.x < 0)){ 
            var lser = game.add.audio('laser');
            lser.play();
            player.animations.play('shoot', 12, false);
            this.fire();
   //          }
             
     }
    
          if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            player.y -= 14;
       player.animations.play('jump', 15,false);
        
           } }

         else {
            player.animations.stop('walk');
            player.frame = 0;
         
         }
         
         if (player.x >= 2900 && gearCnt == 9) {
             game.state.start('completionpage3');
         }
         

         
         if (player_health <= 0 || player.y > 1600) {
             player.animations.play('die', 7, false);
           
             game.time.events.add(Phaser.Timer.SECOND * 1, function() {game.state.start('gameover');}, this).autoDestroy = true;
             
         }
         
         
         //zombie mechanics
         game.physics.arcade.overlap(bullets, zombie, this.hitEnemy);
         game.physics.arcade.overlap(bullets, zombieGroup, this.hitGroup);
         game.physics.arcade.overlap(bullets, boxGroup, this.hitBox);
         game.physics.arcade.overlap(player, zombieGroup, this.touchEnemy);
         game.physics.arcade.collide(zombieGroup,[platformGroup, platform, boxGroup]);
         
         stepCount++;
        
         
         if (stepCount > stepLimit) {
             zombieGroup.setAll("body.velocity.x", -1, false, false, 3, false);
             zombieGroup.setAll("scale.x", -1, false, false, 3, false);
             stepCount = 0;
         }
        

         
         //gear mechanics
         game.physics.arcade.overlap(player, gears, this.getGear);
         
         touchObject = false;

     },
    
    fire: function() {
        if(game.time.now > nextFire) {
        nextFire = game.time.now + fireRate;
     //   console.log("fire");
        bullet = bullets.getFirstDead();
        bullet.reset(player.x + 35, player.y + 127);
        
        if (player.scale.x > 0) {
        bullet.body.velocity.x += 1000;
        }
        else {
            bullet.body.velocity.x -= 1000;
        }

        
        ammo -= 1;
        
        ammoScore.destroy();
        ammoScore = game.add.text(1200,70, 'Ammo: ' + ammo, {fontSize: 500, fill:'#f0ec2b'});
        ammoScore.fixedToCamera = true;
        ammoScore.cameraOffset.setTo(1200,70);

        }
    },
    
    
    hitEnemy: function(){
   //     console.log('hit');
        zombie.kill();
        bullet.kill();
    },
    
    hitGroup: function(b,e) {
        b.kill();
        e.kill();
    },
    
    hitBox: function(b,box) {
        b.kill();
    },
    
    touchEnemy: function(player, enemy) {
        if (game.time.now > nextDamage) {
            if (Math.abs(enemy.x - player.x < 10)) {
            nextDamage = game.time.now + collisionRate;
            
            if(player.x < enemy.x){
                player.x -= 100;
            }
            else if (player.x > enemy.x) {
                player.x += 100;
            }
            player.y -= 15;
            player_health -= 10;
    
            health.destroy();
        health = game.add.text(1200,10, 'Robot Health: ' + player_health, {fontSize: 500, fill:'#DA420A'});
        health.fixedToCamera = true;
        health.cameraOffset.setTo(1200,10);
            }
        }
    },
    
    getGear: function(player, gear) {
        gear.kill();
        gearCnt += 1;
        
        gearScore.destroy();
        gearScore = game.add.text(1200,40, 'Gears Collected: ' + gearCnt, {fontSize: 500, fill:'#f0ec2b'});
        gearScore.fixedToCamera = true;
        gearScore.cameraOffset.setTo(1200,40);
        
        
    }
    


};
