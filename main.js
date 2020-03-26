var GAME_WIDTH = 1920;
var GAME_HEIGHT = 1080;
var loadingText;
var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  preload: function() {
    this.load.image('1920x1080');
    this.load.image('sky', '13219.jpg');
    // const width = this.cameras.main.width;
    // const height = this.cameras.main.height;

    // this.load.image('sky', '13219.jpg');
    // loadingText = this.make.text({
    //     x: width / 2,
    //     y: height / 2 - 50,
    //     text: 'Loading...',
    //     style: {
    //         font: '20px monospace',
    //         fill: '#ffffff'
    //     }
    // });

    // loadingText.setOrigin(0.5, 0.5);
  },
  create: function() {
    // this.logo = this.add.image(0, 0, 'sky').setOrigin(0);
    this.add.image(0, 0, '1920x1080').setOrigin(0, 0);

    console.assert(this.game.canvas.width === 1920);
    console.assert(this.game.canvas.height === 1080);
  }
});

var config = {
  type: Phaser.AUTO,
  scale: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },

  parent: 'phaser-example',
  scene: GameScene
};

var game = new Phaser.Game(config);
