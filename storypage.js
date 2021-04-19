var text;


test.storypage = function(){};
test.storypage.prototype = {
  preload: function(){
      game.load.image('text_1', 'assets/sprites/text_1.png');
      game.load.image('text_2', 'assets/sprites/text_2.png');
      game.load.image('text_3', 'assets/sprites/text_3.png');
      game.load.image('text_5', 'assets/sprites/text_5.png');
      game.load.image('text_6', 'assets/sprites/text_6.png');
       game.load.image('text_7', 'assets/sprites/text_7.png');
       game.load.image('text_8', 'assets/sprites/text_8.png');
      
      game.load.image('play', 'assets/sprites/clickplay.png', 248, 13);

  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
      game.stage.backgroundColor = '#000000'
   var text_1 = game.add.sprite(30,200, 'text_1');
   var text_2 = game.add.sprite(30,250, 'text_2');
   var text_3 = game.add.sprite(25,300, 'text_3');
    var text_5 = game.add.sprite(350, 'text_5');
      var text_6 = game.add.sprite(30,400, 'text_6');
      var text_7 = game.add.sprite(30,500, 'text_7');
      var text_8 = game.add.sprite(30,550, 'text_8');
      
      var playbttn = game.add.button(500,800, 'play', function() { game.state.start('levelone');});
      
      
      text_1.scale.setTo(.8,.8);
      text_2.scale.setTo(.7,.7);
      text_3.scale.setTo(1.2,1.2);
     
      text_8.scale.setTo(1.2,1.2);
      playbttn.scale.setTo(1.5,1.5);
      

  },
  spellText: function(x, y, width, text, fontSize, speed, fill,  font){
    var sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
    var currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', font: font});
    currentLine.alpha = 0;
    var loop = game.time.events.loop(speed, spellChar);

    var index = 0;

    function spellChar() {
      sentence.text += story[index];
      currentLine.text += story[index];

      if (currentLine.width > width && story[index] == ' ') {
        sentence.text += '\n';
        currentLine.text = '';
      }
      if (index >= story.length - 1) {
        game.time.events.remove(loop);
        console.log('stop');
        game.state.start('levelone'); player_health = 100; gearCnt = 0; ammo = 10;
      }
      index++;
    }
  }
};