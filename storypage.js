var text;


test.storypage = function(){};
test.storypage.prototype = {
  preload: function(){

  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         
      game.stage.backgroundColor = '#000000'
  

    story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices enim sem, quis interdum velit blandit eget. Suspendisse mollis est a lectus dictum ornare. Donec a suscipit magna. Sed mauris turpis, tristique quis ante ut, ullamcorper facilisis nisl. Proin quis orci faucibus, congue nisi ac, imperdiet justo. Donec scelerisque, libero.';


    this.spellText(100, 100, 1000, story, 400, 40, '#d2db27', 'Papyrus');

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
      }
      index++;
    }
  }
};