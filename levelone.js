var test = {}, centerX = 1500/2, centerY = 1000/2, player,zombie, speed = 6, zombie_cnt = 0;

test.levelone = function() {};


test.levelone.prototype = {
    
     preload: function(){
         game.load.image('night', 'assets/backgrounds/nightbackground.jpg');
         
         game.load.spritesheet('player', 'assets/spritesheets/robot.png', 121, 200);
         game.load.spritesheet('zombie', 'assets/spritesheets/zombie.png', 120, 191);
         
     },
    
     create: function() {
         
         //game setup
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
        game.stage.backgroundColor = '#3269a8';
        game.world.setBounds(0,0,3000,1000);
         
        var background = game.add.sprite(0,0, 'night');
         
         //zombie setup
        zombie = game.add.sprite(centerX - 400, centerY + 260, 'zombie');
        zombie.scale.setTo(-1.25,1.25);
      
        game.physics.enable(zombie);
        zombie.body.gravity.y = 400;
        zombie.body.collideWorldBounds = true;
         
        zombie.animations.add('walk',[0,1,2,3,4,5,6]);
         
         
         //player setup
        player = game.add.sprite(centerX - 700, centerY + 260,'player');
        player.anchor.setTo(0.5,0.1);
        player.scale.setTo(1.25,1.25);
         
        game.physics.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
         
        player.animations.add('walk', [1,2,3,4]);
        player.animations.add('jump', [9,10,11,12,13,14,15,16]);
        player.animations.add('shoot', [17,18]);
        
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 500, 200, 900,1000);
     },
    
     update: function() {
         
         
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
         else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
   
        player.animations.play('shoot', 12, false);
     }
    
         else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            player.y -= 15;
       player.animations.play('jump', 15,false);
        
             
           if (player.y < 500) {
               player.y = 500;
                player.animations.play('walk', 12,true);}
           }

         else {
            player.animations.stop('walk');
            player.frame = 0;
         
        }

        
         
        //zombie actions
        if (zombie_cnt % 400 == 0) {
        zombie.x -= 30;
        zombie.scale.setTo(-1.25,1.25);
        zombie.animations.play('walk', 6, true);
        zombie_cnt += 1;
        }
        
        else if (zombie_cnt % 0 != 0) {
        zombie.x += 30;
        zombie.scale.setTo(1.25,1.25);
        zombie.animations.play('walk', 6, true);
        zombie_cnt += 1;
        }

     }
};

function touchEnemy(player, enemy) {
    if (in_action == true && e_health > 0) {
        e_health -= 10;
    }
player.x *= -1;

}
