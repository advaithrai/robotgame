test.storypage3 = function(){};
test.storypage3.prototype = {
  preload: function(){
      game.load.image('txt_1', 'assets/sprites/txt3_1.png');
      game.load.image('txt_2', 'assets/sprites/txt3_2.png');
      game.load.image('txt_3', 'assets/sprites/txt3_3.png');
      game.load.image('txt_4', 'assets/sprites/txt3_4.png');
   

   
      
      game.load.image('play', 'assets/sprites/clickplay.png', 248, 13);

  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
      game.stage.backgroundColor = '#000000'
   var txt_1 = game.add.sprite(30,400, 'txt_1');
   var txt_2 = game.add.sprite(30,200, 'txt_2');
   var txt_3 = game.add.sprite(30,150, 'txt_3');
   
    var txt_4 = game.add.sprite(30,100, 'txt_4');

      
      
      var playbttn = game.add.button(500,800, 'play', function() { game.state.start('levelthree');});
      
      txt_2.scale.setTo(1.25,1.25);
      txt_3.scale.setTo(1.25,1.25);
     
      
      playbttn.scale.setTo(1.5,1.5);
      

  },

};