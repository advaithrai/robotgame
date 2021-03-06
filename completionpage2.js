
test.completionpage2 = function(){};

test.completionpage2.prototype = {
    
     preload: function(){
         game.load.image('rcity1', 'assets/backgrounds/ruinedcity.png');
         game.load.image('complete1', 'assets/sprites/levelcomplete.png');
         game.load.image('gear1', 'assets/sprites/gear.png');
         game.load.image('bullet1', 'assets/sprites/bullet.png');
         game.load.image('play1', 'assets/sprites/play.png');

         //game.load.image('nlevel', 'assets/sprites/nextlevel.png');
     },
     create: function() {
         
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         game.world.setBounds(0,0,3000,1000);
        
        game.stage.backgroundColor = '#000000';
         
        var background = game.add.sprite(0,0, 'rcity1');
        var logo = game.add.sprite(100,200, 'complete1');
         
        gearLogo = game.add.text(650,370, 'Gears Collected: ' + gearCnt, {fontSize: 1000, fill:'#DA420A'});
        ammoLogo = game.add.text(650,450, 'Ammo Left: ' + ammo, {fontSize: 1000, fill:'#DA420A', fontFamily: 'Copperplate'});
        var gear_1 = game.add.sprite(550,350, 'gear1');
        var bullet_1 = game.add.sprite(555,450, 'bullet1');
        bullet_1.scale.setTo(4,4);
         
        //var proceedButton = game.add.sprite(550, 600, 'nlevel');
         
        technoMusic.stop();
        zombieNoises.stop();   
         
         
        //transition between the next levels
        var playButton1 = game.add.button(700,700, 'play1', function() { game.state.start('storypage4'); health; gearCnt; ammo;})


     },
     update: function() {}
};