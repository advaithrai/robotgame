test.completionpage = function() {};


test.completionpage.prototype = {
    
     preload: function(){
         
         game.load.image('bg', 'assets/backgrounds/dirty-wall.jpg');
         game.load.image('complete', 'assets/sprites/levelcomplete.png');
         
     },
    
     create: function() {
         
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
         var background = game.add.sprite(0,0, 'bg');
         var logo = game.add.sprite(100,500, 'complete');
     },
    
     update: function() {}
};