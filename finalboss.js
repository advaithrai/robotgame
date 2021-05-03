
var centerX = 1500/2, centerY = 1000/2, speed = 8, velocity = 1000, t;
var boss, platform, platformGroup, bossHealth = 50;
var globs, glob;
var actionList = [], actionTimer = 0;
test.finalboss = function() {};


test.finalboss.prototype = {
    
     preload: function(){
         game.load.image('night', 'assets/backgrounds/GB.jpg');
         game.load.image('platform', 'assets/sprites/platform.png');
         game.load.image('gear', 'assets/sprites/gear.png');
         game.load.image('box', 'assets/sprites/box.png');
         game.load.image('glob', 'assets/sprites/glob.png');
         game.load.image('bullet', 'assets/sprites/bullet.png');
         
         game.load.spritesheet('boss', 'assets/spritesheets/monster.png', 191, 165);
         game.load.spritesheet('zombie', 'assets/spritesheets/zombie.png', 120, 191);
         game.load.spritesheet('player', 'assets/spritesheets/robotnew.png', 121, 200);
         
         game.load.audio('laser', ['assets/sounds/laser.mp3','assets/sounds/laser.ogg','assets/sounds/laser.wav']);
         game.load.audio('zombies', ['assets/sounds/zombies.mp3','assets/sounds/zombies.wav','assets/sounds/zombies.m4a','assets/sounds/zombies.ogg',]);
         
         
     },
    
     create: function() {
         
         //game setup
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
        game.stage.backgroundColor = '#3269a8';
        game.world.setBounds(0,0,3000,1000);
         
         
        // background
        var background = game.add.sprite(0,0, 'night');
        //platforms
        platform = game.add.sprite(1550,1390, 'platform');
        platformGroup = game.add.group();
        platformGroup.create(100, 700, 'platform');
        //platformGroup.create(300, 600, 'platform');
        platformGroup.create(420, 300, 'platform');
        platformGroup.create(800, 700, 'platform');
        platformGroup.create(2500, 950, 'platform');
         
        platformGroup.create(1200, 300, 'platform');
        platformGroup.create(1600, 700, 'platform');
        platformGroup.create(2100, 300, 'platform');



         



        //platformGroup.create(200, 500, 'platform');
        //platformGroup.create(300, 300, 'platform');
        //platformGroup.create(400, 300, 'platform');


        box = game.add.sprite(1550,1390, 'box');
        boxGroup = game.add.group();
        //boxGroup.create(300, 840, 'box');
        //boxGroup.create(410, 840, 'box');
        //boxGroup.create(370, 720, 'box');
         
         

    
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
        player = game.add.sprite(centerX - 600, centerY + 200,'player');
        player.anchor.setTo(0.5,0.1);
        player.scale.setTo(1.55,1.55);
         
        game.physics.enable([player, platform, platformGroup]);
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true; 
         
        //animations
        player.animations.add('walk', [1,2,3,4]);
        player.animations.add('jump', [14,15,16]);
        player.animations.add('shoot', [17,18]);
        player.animations.add('die',[19,20,21,22,23,24,25,26,27]);
         
         
        //camera 
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 500, 200, 900,1000);
        
         
         
        //text messages
        health = game.add.text(1200,10, 'Robot Health: ' + player_health, {fontSize: 500, fill:'#DA420A'});
        health.fixedToCamera = true;
        health.cameraOffset.setTo(1200,10);
         
        health_e = game.add.text(100,10, 'Boss Health: ' + bossHealth, {fontSize: 500, fill:'#DA420A'});
        health_e.fixedToCamera = true;
        health_e.cameraOffset.setTo(100,10);
         
        gearScore = game.add.text(1200,40, 'Gears Collected: ' + gearCnt, {fontSize: 500, fill:'#f0ec2b'});
        gearScore.fixedToCamera = true;
        gearScore.cameraOffset.setTo(1200,40);
         
        ammoScore = game.add.text(1200,70, 'Ammo: ' + ammo, {fontSize: 500, fill:'#f0ec2b'});
        ammoScore.fixedToCamera = true;
        ammoScore.cameraOffset.setTo(1200,70);
        
         
         
         //gears setup
         gears = game.add.group();
         gears.enableBody = true;
         gears.physicsBodyType = Phaser.Physics.ARCADE;
         //gears.create(950, 800, 'gear');
         //gears.create(1000, 800, 'gear');
         gears.create(450, 100, 'gear');
         gears.create(1100, 900, 'gear');
         gears.create(1250, 100, 'gear');
         gears.create(1680, 900, 'gear');
         gears.create(2150, 100, 'gear');
         gears.create(2150, 900, 'gear');
         gears.create(2600, 900, 'gear');






         
        globs = game.add.group();
        globs.enableBody = true;
        globs.physicsBodyType = Phaser.Physics.ARCADE;
        globs.createMultiple(10,'glob');     
        globs.setAll('checkWorldBounds',  'true');
        globs.setAll('outOfBoundsKill', true);
    
        
       
	    globs.callAll('anchor.setTo', 'anchor', 0.5, 0.1);
	    globs.setAll('checkWorldBounds', true);
         
         
        //boss
        boss = game.add.sprite(centerX + 1800, centerY - 100,'boss');
        boss.anchor.setTo(0.5,0.1);
        boss.scale.setTo(4.25,4.25);
        
        boss.enableBody = true;
        boss.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.enable(boss);

        boss.animations.add('idle', [0,1]);
        boss.animations.add('attack', [1,2]);
        boss.animations.add('damage', [3,4]);
         
        for (var i = 0;i <= 150; i++) {
            actionList.push('idle');
        }
        
        for (i = 0; i <= 40; i++) {
            actionList.push('attack');
        }
         
         
         
        platform.body.immovable = true;
        platformGroup.setAll('body.immovable', true);
        boxGroup.setAll('body.immovable', true);
         
        //music
        technoMusic.play();
         
        
     },
    
    
    
    
     update: function() {
         

        game.physics.arcade.collide(player,[platform, platformGroup, boxGroup], function() {
             touchObject = true;
         });
        
         
        //player controls
        if (game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.activePointer.isDown){ 
         if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        player.x += speed; 
        player.scale.setTo(1.50,1.50);
   
        player.animations.play('walk', 12, true);
     }
         
         if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
             
        player.x -= speed;
        player.scale.setTo(-1.5,1.5);
   
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
         //gearScore
        if (gearCnt >= 16) {
             game.state.start('youwin');
         }
         
         if (bossHealth <= 0) {
             boss.kill();
             
         }
         
         if (player_health <= 0) {
             player.animations.play('die', 7, false);
           
             game.time.events.add(Phaser.Timer.SECOND * 1, function() {game.state.start('gameover');}, this).autoDestroy = true;
             
         }

         
         //how fast the boss fires bullets
         if (actionTimer >= 190) {
             actionTimer = 0;       
         }
         boss.animations.play(actionList[actionTimer], 4, true);
         
         if ( actionTimer == 170 && bossHealth > 0) {
                 glob = globs.getFirstDead();
                if (glob) {
		              glob.reset(boss.x, boss.y + 400);
                      glob.scale.setTo(2.25,2.25);
                    //orginally -500 but wanted to make it more challenging 
		              glob.body.velocity.x = -880;
                     
	           }

         }
         
         actionTimer += 1;
         

        game.physics.arcade.overlap(bullets, boss, this.hitEnemy);
        game.physics.arcade.overlap(globs, player, this.hitPlayer);
        game.physics.arcade.overlap(player, gears, this.getGear);

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
        if (bullet.x > 950) {
        boss.animations.play('damage', 2, false);
        bossHealth -= 10;
        bullet.kill();
            
        health_e.destroy();
        health_e = game.add.text(100,10, 'Boss Health: ' + bossHealth, {fontSize: 500, fill:'#DA420A'});
        health_e.fixedToCamera = true;
        health_e.cameraOffset.setTo(100,10);
        
        }
            
    },
    
        hitPlayer: function() {
        if (glob.x - player.x < 10) {
        console.log(player_health);
        player_health -= 10;
        glob.kill();
        
        health.destroy();
        health = game.add.text(1200,10, 'Robot Health: ' + player_health, {fontSize: 500, fill:'#DA420A'});
        health.fixedToCamera = true;
        health.cameraOffset.setTo(1200,10);

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
