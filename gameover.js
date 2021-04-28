test.gameover = function() {};

test.gameover.prototype = {
    
     preload: function(){
         game.load.image('gameover', 'assets/sprites/gameover.png');
         game.load.image('tryagain', 'assets/sprites/tryagain.png');
     },
    
     create: function() {
         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
         game.stage.backgroundColor = '#000000';
         game.world.setBounds(0,0,3000,1000);
         technoMusic.stop();
         zombieNoises.stop();
         
         var logo = game.add.sprite(150,400, 'gameover');
         logo.scale.setTo(2,2);
         
         var bttn = game.add.button(400,800, 'tryagain', function() { game.state.start('startpage');});
        
     },
    
     update: function() {}
};