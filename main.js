var GAME_WIDTH = 1920;
var GAME_HEIGHT = 1080;
var GAME_RECT = Object.assign(
  new Phaser.Geom.Rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT),
  { originX: 0, originY: 0 }
);
var loadingText;
var Center = Phaser.Display.Align.In.Center;

var debug = document.getElementById('debug');

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  preload: function() {
    this.load.image('1920x1080');
    this.load.image('sky', '13219.jpg');

    loadingText = this.make.text({
      text: 'Loading...',
      style: {
        font: '120px monospace',
        fill: '#ffffff'
      }
    });

    loadingText.setOrigin(0.5, 0.5);

    Center(loadingText, GAME_RECT, 0, -50);
  },

  create: function() {
    // this.logo = this.add.image(0, 0, 'sky').setOrigin(0);

    loadingText.setText('Done');

    this.add.image(0, 0, '1920x1080').setOrigin(0, 0);

    this.cameras.main.setOrigin(0, 0);

    this.scale.on('orientationchange', checkOriention, this);
  },

  update: function() {
    debug.innerText = [
      'canvasBounds: ' + JSON.stringify(this.scale.canvasBounds),
      'gameSize:     ' + this.scale.gameSize,
      'parentSize:   ' + this.scale.parentSize,
      'displaySize:  ' + this.scale.displaySize,
      'displayScale: ' + JSON.stringify(this.scale.displayScale),
      'camera:       ' + JSON.stringify(this.cameras.main.toJSON()),
      'worldView:    ' + JSON.stringify(this.cameras.main.worldView)
    ].join('\n');
  }
});

function checkOriention(orientation) {
  console.log('checkOrientation', orientation);

  var displaySize = this.scale.displaySize;
  var displayScale = this.scale.displayScale;
  var cam = this.cameras.main;

  // Force update displaySize.aspectRatio
  // https://github.com/photonstorm/phaser/issues/4971

  if (orientation === Phaser.Scale.PORTRAIT) {
    displaySize.aspectRatio = GAME_HEIGHT / GAME_WIDTH;
    this.scale.setGameSize(GAME_HEIGHT, GAME_WIDTH);
    cam.setAngle(90).setScroll(0, GAME_HEIGHT);
  } else if (orientation === Phaser.Scale.LANDSCAPE) {
    displaySize.aspectRatio = GAME_WIDTH / GAME_HEIGHT;
    this.scale.setGameSize(GAME_WIDTH, GAME_HEIGHT);
    cam.setAngle(0).setScroll(0, 0);
  }

  console.assert(
    Phaser.Math.Fuzzy.Equal(displayScale.x, displayScale.y),
    'Scaled proportionally (x ≈ y)'
  );
}

var config = {
  type: Phaser.AUTO,
  scale: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser-example'
  },

  scene: GameScene
};

var game = new Phaser.Game(config);
