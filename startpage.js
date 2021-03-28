test.startpage = function() {};


test.startpage.prototype = {
    
     preload: function(){
         game.load.image('bg', 'assets/backgrounds/dirty-wall.jpg');
         game.load.image('play', 'assets/sprites/play.png');
     },
    
     create: function() {
         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
         var background = game.add.sprite(0,0, 'bg');
         
         var playButton = game.add.button(500,500, 'play', function() { game.state.start('levelone');})
         
         playButton.scale.setTo(2.5,2.5);
     },
    
     update: function() {}
};

