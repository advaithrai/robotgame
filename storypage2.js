test.storypage2 = function(){};
test.storypage2.prototype = {
  preload: function(){
      game.load.image('cp_1', 'assets/sprites/cp_1.png');
      game.load.image('cp_2', 'assets/sprites/cp_2.png');
      game.load.image('cp_3', 'assets/sprites/cp_3.png');
      game.load.image('cp_5', 'assets/sprites/cp_5.png');
      game.load.image('cp_4', 'assets/sprites/cp_4.png');
       game.load.image('gameOver', 'assets/sprites/gameover.png');
   
      
      game.load.image('play', 'assets/sprites/clickplay.png', 248, 13);

  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
      game.stage.backgroundColor = '#000000'
   var cp_1 = game.add.sprite(780,344, 'cp_1');
   var cp_2 = game.add.sprite(30,350, 'cp_2');
   var cp_3 = game.add.sprite(25,300, 'cp_3');
    var cp_5 = game.add.sprite(30,200, 'cp_5');
      var cp_4 = game.add.sprite(30,250, 'cp_4');
      var gameOver = game.add.sprite(1090,350, 'gameOver');
      
      
      var playbttn = game.add.button(500,800, 'play', function() { game.state.start('leveltwo');});
      
      
      cp_2.scale.setTo(1.2,1.2);
      cp_1.scale.setTo(1.4,1.4);
      gameOver.scale.setTo(.3,.3);
      
      playbttn.scale.setTo(1.5,1.5);
      

  },

};