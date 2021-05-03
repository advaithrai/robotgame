test.storypage5 = function(){};
test.storypage5.prototype = {
  preload: function(){
      game.load.image('txt5_1', 'assets/sprites/txt5_1.png');
      game.load.image('txt5_2', 'assets/sprites/txt5_2.png');
      game.load.image('txt5_3', 'assets/sprites/txt5_3.png');
      game.load.image('txt5_4', 'assets/sprites/txt5_4.png');
      game.load.image('txt5_5', 'assets/sprites/txt5_5.png');

   
      
      game.load.image('play', 'assets/sprites/toend.png', 248, 13);

  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
      game.stage.backgroundColor = '#000000'
   var txt5_1 = game.add.sprite(30,100, 'txt5_1');
   var txt5_2 = game.add.sprite(30,200, 'txt5_2');
   var txt5_3 = game.add.sprite(30,350, 'txt5_3');
   
    var txt5_4 = game.add.sprite(30,400, 'txt5_4');
    var txt5_5 = game.add.sprite(30,500, 'txt5_5');

      
      
      var playbttn = game.add.button(500,800, 'play', function() { game.state.start('youwin');});
      
      txt5_2.scale.setTo(.8,.8);
    
     
      
      playbttn.scale.setTo(1.5,1.5);
      

  },

};