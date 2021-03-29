var test = {};
var centerX = 1500/2, centerY = 1000/2, speed = 6, velocity = 1000;
var player, player_health = 100, collisionRate = 200, nextDamage = 0, health;
var zombie, zombieGroup;
var platform, platformGroup, boxGroup;
var bullets, bullet, nextFire = 0, fireRate = 200, ammo = 10, gearCnt = 5, ammoScore;
var gears, gear, gearCnt = 0, gearScore; 

test.levelone = function() {};


test.levelone.prototype = {
    
     preload: function(){
         game.load.image('night', 'assets/backgrounds/nightbackground.jpg');
         game.load.image('platform', 'assets/sprites/platform.png');
         game.load.image('gear', 'assets/sprites/gear.png');
         game.load.image('box', 'assets/sprites/box.png');
         
         game.load.spritesheet('player', 'assets/spritesheets/robot.png', 121, 200);
         game.load.spritesheet('zombie', 'assets/spritesheets/zombie.png', 120, 191);
         game.load.image('bullet', 'assets/sprites/bullet.png');
         
     },
    
     create: function() {
         
         //game setup
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
        game.stage.backgroundColor = '#3269a8';
        game.world.setBounds(0,0,3000,1000);
         
        var background = game.add.sprite(0,0, 'night');
        platform = game.add.sprite(1500,700, 'platform');
        platformGroup = game.add.group();
        platformGroup.create(1000, 600, 'platform');
        platformGroup.create(1700, 700, 'platform');
        boxGroup = game.add.group();
        boxGroup.create(500, 840, 'box');
        boxGroup.create(2300, 840, 'box');
         
         //zombie setup
        zombie = game.add.sprite(centerX - 400, centerY + 260, 'zombie');
        zombie.scale.setTo(-1.25,1.25);
      
        game.physics.enable(zombie);
        zombie.body.gravity.y = 400;
        zombie.body.collideWorldBounds = true;
         
        zombie.animations.add('walk',[0,1,2,3,4,5,6]);
        
        zombieGroup = game.add.group();
        zombieGroup.enableBody = true;
        zombieGroup.physicsBodyType = Phaser.Physics.ARCADE;
        zombieGroup.setAll("body.gravity.y", 400);
        zombieGroup.create(700, centerY + 260, 'zombie');
        zombieGroup.create(1600, 500, 'zombie');
        zombieGroup.create(2500, centerY + 260, 'zombie');
        
         //bullets setup
         bullets = game.add.group();
         bullets.enableBody = true;
         bullets.physicsBodyType = Phaser.Physics.ARCADE;
         bullets.createMultiple(10,'bullet');
         
         bullets.setAll('checkWorldBounds',  'true');
         bullets.setAll('outOfBoundsKill', true);
         
         //gears setup
         gears = game.add.group();
         gears.enableBody = true;
         gears.physicsBodyType = Phaser.Physics.ARCADE;
         gears.create(1000, 820, 'gear');
         gears.create(1600, 600, 'gear');
         gears.create(2320, 750, 'gear');
         
         //player setup
        player = game.add.sprite(centerX - 700, centerY + 260,'player');
        player.anchor.setTo(0.5,0.1);
        player.scale.setTo(1.25,1.25);
         
        game.physics.enable([player, platform, platformGroup, boxGroup]);
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
         
        player.animations.add('walk', [1,2,3,4]);
        player.animations.add('jump', [9,10,11,12,13,14,15,16]);
        player.animations.add('shoot', [17,18]);
        
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 500, 200, 900,1000);
        
        health = game.add.text(1200,10, 'Robot Health: ' + player_health, {fontSize: 500, fill:'#DA420A'});
        gearScore = game.add.text(1200,40, 'Gears Collected: ' + gearCnt, {fontSize: 500, fill:'#f0ec2b'});
        ammoScore = game.add.text(1200,70, 'Ammo: ' + ammo, {fontSize: 500, fill:'#f0ec2b'});
         
        platform.body.immovable = true;
        platformGroup.setAll('body.immovable', true);
        boxGroup.setAll('body.immovable', true);
        
     },
    
     update: function() {

         
         //player mechanics
         game.physics.arcade.collide(player,[platform, platformGroup, boxGroup]);
         
         
        //player controls
         
         if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        player.x += speed; 
        player.scale.setTo(1.25,1.25);
        player.animations.play('walk', 12, true);
     }
         
         else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        player.x -= speed;
        player.scale.setTo(-1.25,1.25);
        player.animations.play('walk', 12, true);
     }
         else if (game.input.activePointer.isDown && ammo > 0) {
            player.animations.play('shoot', 12, false);
            this.fire();
            
             
     }
    
         else if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            player.y -= 15;
       player.animations.play('jump', 15,false);
        
           }

         else {
            player.animations.stop('walk');
            player.frame = 0;
         
         }
         
         
         //zombie mechanics
         game.physics.arcade.overlap(bullets, zombie, this.hitEnemy);
         game.physics.arcade.overlap(bullets, zombieGroup, this.hitGroup);
         game.physics.arcade.overlap(bullets, boxGroup, this.hitBox);
         game.physics.arcade.overlap(player, zombieGroup, this.touchEnemy);
         game.physics.arcade.collide(zombieGroup,[platformGroup, platform, boxGroup]);
         
         //gear mechanics
         game.physics.arcade.overlap(player, gears, this.getGear);

     },
    
    fire: function() {
        if(game.time.now > nextFire) {
        nextFire = game.time.now + fireRate;
     //   console.log("fire");
        bullet = bullets.getFirstDead();
        bullet.reset(player.x + 35, player.y + 127);
        
        game.physics.arcade.moveToPointer(bullet, velocity);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        
        ammo -= 1;
        
        ammoScore.destroy();
        ammoScore = game.add.text(1200,70, 'Ammo: ' + ammo, {fontSize: 500, fill:'#f0ec2b'});
        }
    },
    
   /* patrolEnemy: function(z, p) {
        if (z.body.velocity.x >  0 && z.right > p.right) {
            z.body.velocity.x *= -1;
        }
        else if (z.body.velocity.x < 0 && z.left < p.left) {
            z.body.velocity.x  *= -1;
        }
    }, */
    
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
        }
    },
    
    getGear: function(player, gear) {
        gear.kill();
        gearCnt += 1;
        
        gearScore.destroy();
        gearScore = game.add.text(1200,40, 'Gears Collected: ' + gearCnt, {fontSize: 500, fill:'#f0ec2b'});
        
        
    }



};




