var test = {};
var centerX = 1500/2, centerY = 1000/2, speed = 6, velocity = 1000;
var player,zombie, zombieGroup;
var platform, platformGroup;
var bullets, bullet, nextFire = 0, fireRate = 200, ammo = 10, gearCnt = 5;

test.levelone = function() {};


test.levelone.prototype = {
    
     preload: function(){
         game.load.image('night', 'assets/backgrounds/nightbackground.jpg');
         game.load.image('platform', 'assets/sprites/platform.png');
         
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
        platform = game.add.sprite(500,800, 'platform');
         
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
        zombieGroup.setAll("body.gravity.y",400);
        
         for ( var i = 0; i < 9; i++) {
             zombieGroup.create(centerX - 400 + (i * 400), centerY + 260, 'zombie');
         }
        
         //bullets setup
         bullets = game.add.group();
         bullets.enableBody = true;
         bullets.physicsBodyType = Phaser.Physics.ARCADE;
         bullets.createMultiple(50,'bullet');
         
         bullets.setAll('checkWorldBounds',  'true');
         bullets.setAll('outOfBoundsKill', true);
         
         //player setup
        player = game.add.sprite(centerX - 700, centerY + 260,'player');
        player.anchor.setTo(0.5,0.1);
        player.scale.setTo(1.25,1.25);
         
        game.physics.enable([player, platform]);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
         
        player.animations.add('walk', [1,2,3,4]);
        player.animations.add('jump', [9,10,11,12,13,14,15,16]);
        player.animations.add('shoot', [17,18]);
        
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 500, 200, 900,1000);
         
        platform.body.immovable = true;
     },
    
     update: function() {
        
         //player mechanics
         game.physics.arcade.collide(platform,player);
         
        //player controls
         if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.x += speed;
        player.scale.setTo(1.25,1.25);
        player.animations.play('walk', 12, true);
     }
         
         else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.x -= speed;
        player.scale.setTo(-1.25,1.25);
        player.animations.play('walk', 12, true);
     }
         else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && ammo > 0) {
            player.animations.play('shoot', 12, false);
            this.fire();
            
             
     }
    
         else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            player.y -= 15;
       player.animations.play('jump', 15,false);
        
             
           if (player.y < 400) {
               player.y = 400;
                player.animations.play('walk', 12,true);}
           }

         else {
            player.animations.stop('walk');
            player.frame = 0;
         
         }
         
         
         //zombie mechanics
         game.physics.arcade.overlap(bullets, zombie, this.hitEnemy);
         game.physics.arcade.overlap(bullets, zombieGroup, this.hitGroup);
         game.physics.arcade.overlap(player, zombieGroup, this.touchEnemy);

     },
    
    fire: function() {
        if(game.time.now > nextFire) {
        nextFire = game.time.now + fireRate;
        console.log("fire");
        bullet = bullets.getFirstDead();
        bullet.reset(player.x + 35, player.y + 127);
        
        game.physics.arcade.moveToPointer(bullet, velocity);
        
        ammo -= 1;
    }
    },
    
    hitEnemy: function(){
        console.log('hit');
        zombie.kill();
        bullet.kill();
    },
    
    hitGroup: function(b,e) {
        b.kill();
        e.kill();
    },
    
    touchEnemy: function(player, enemy) {
        
        if(player.x < enemy.x){
            player.x -= 50;
        }
        else if (player.x > enemy.x) {
            player.x += 50;
        }
    },
    
    getGear: function(player, gear) {
        console.log('gear');
        gear.kill();
        gearCnt -= 1;
        
    }



};




