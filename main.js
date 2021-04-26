var game = new Phaser.Game(1500,1000, Phaser.AUTO);
game.state.add('levelone', test.levelone);
game.state.add('leveltwo', test.leveltwo);
game.state.add('levelthree', test.levelthree);
game.state.add('startpage', test.startpage);
game.state.add('completionpage', test.completionpage);
game.state.add('completionpage1', test.completionpage1);
game.state.add('completionpage2', test.completionpage2);
game.state.add('storypage', test.storypage);
game.state.add('gameover', test.gameover);
game.state.start('startpage');