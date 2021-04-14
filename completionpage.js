test.completionpage = function() {};


test.completionpage.prototype = {
    
     preload: function(){
         
         game.load.image('bg', 'assets/backgrounds/dirty-wall.jpg');
         game.load.image('complete', 'assets/sprites/levelcomplete.png');
         
         game.load.image('gear', 'assets/sprites/gear.png');
          game.load.image('bullet', 'assets/sprites/bullet.png');
         
     },
    
     create: function() {
         
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        game.stage.backgroundColor = '#000000';
         
   //      var background = game.add.sprite(0,0, 'bg');
         var logo = game.add.sprite(100,500, 'complete');
         
        gearLogo = game.add.text(600,700, 'Gears Collected: ' + gearCnt, {fontSize: 1000, fill:'#DA420A'});
        ammoLogo = game.add.text(600,800, 'Ammo Left: ' + ammo, {fontSize: 1000, fill:'#DA420A', fontFamily: 'Copperplate'});
         
        var gear_1 = game.add.sprite(500,680, 'gear');
        var bullet_1 = game.add.sprite(500,805, 'bullet');
        bullet_1.scale.setTo(4,4);
         
        technoMusic.stop();
        zombieNoises.stop();

     },
    
     update: function() {}
};