
test.completionpage2 = function(){};

test.completionpage2.prototype = {
    
     preload: function(){
         game.load.image('rcity2', 'assets/backgrounds/ruinedcity.png');
         game.load.image('complete2', 'assets/sprites/levelcomplete.png');
         game.load.image('gear2', 'assets/sprites/gear.png');
         game.load.image('bullet2', 'assets/sprites/bullet.png');
         game.load.image('play2', 'assets/sprites/play.png');

         //game.load.image('nlevel', 'assets/sprites/nextlevel.png');
     },
     create: function() {
         
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         game.world.setBounds(0,0,3000,1000);
        
        game.stage.backgroundColor = '#000000';
         
        var background = game.add.sprite(0,0, 'rcity2');
        var logo = game.add.sprite(100,200, 'complete2');
         
        gearLogo = game.add.text(650,370, 'Gears Collected: ' + gearCnt, {fontSize: 1000, fill:'#DA420A'});
        ammoLogo = game.add.text(650,450, 'Ammo Left: ' + ammo, {fontSize: 1000, fill:'#DA420A', fontFamily: 'Copperplate'});
        var gear_1 = game.add.sprite(550,350, 'gear2');
        var bullet_1 = game.add.sprite(555,450, 'bullet2');
        bullet_1.scale.setTo(4,4);
         
        //var proceedButton = game.add.sprite(550, 600, 'nlevel');
         
        technoMusic.stop();
        zombieNoises.stop();   
         



     },
     update: function() {}
};