test.startpage = function() {};


test.startpage.prototype = {
    
     preload: function(){
         game.load.image('bg', 'assets/backgrounds/dirty-wall.jpg');
         game.load.image('play', 'assets/sprites/play.png');
         game.load.image('rbotlogo', 'assets/sprites/rbotlogo.png');
        game.load.image('robotlogo', 'assets/sprites/robotlogo.png');
         game.load.image('versus', 'assets/sprites/versus.png');
          game.load.image('zombies', 'assets/sprites/zombies.png');
         game.load.image('wad', 'assets/sprites/wad.png');
         game.load.image('mouse', 'assets/sprites/mouse.png');
     },
    
     create: function() {
         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
         var background = game.add.sprite(0,0, 'bg');
         var logo = game.add.sprite(300,20, 'robotlogo');
         logo.scale.setTo(4,4);
         var rbot = game.add.sprite(100,600,'rbotlogo');
         var versus = game.add.sprite(700,600, 'versus');
         versus.scale.setTo(.8,.8);
         var zombie = game.add.sprite(980,600, 'zombies');
         
         var wad = game.add.sprite(1100, 100, 'wad');
         var mouse = game.add.sprite(1100, 200, 'mouse');
         
         //storypage
         var playButton = game.add.button(500,700, 'play', function() { game.state.start('storypage'); player_health = 100; gearCnt = 0; ammo = 15;})
         
         playButton.scale.setTo(2.5,2.5);
     },
    
     update: function() {}
};

