var text;


test.storypage = function(){};
test.storypage.prototype = {
  preload: function(){

  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
      game.stage.backgroundColor = '#000000'
  

    story = "It's the year 2100, nuclear warfare has taken over the entire country. Due to the nuclear radiation most of the population become mindless zombies. A select few individuals create a robot which is sent out into this destoyed world and must find a cure for humanity. This is only possible by collecting all the gears that have been scattered around the globe, without the gears humanity will never have the knowledge to defeat this war";


    this.spellText(100, 100, 1000, story, 4000, 40, '#d2db27', 'Papyrus');

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