// client/app/services/services.js
angular.module('tetris.services', [])

.service('logic', function() {
  ///////////////////
  //Configuration
  ///////////////////
  this.row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.boardHeight = 20;
  this.startInterval = 400;
  this.intervalChangeOnLevelUp = 50;
  this.rowsPerLevel = 10;
  this.ghostEnabled = true;
  this.minInterval = 50;

  var X = 0;
  var Y = 1;

  ///////////////////
  //PIECE DEFINITIONS
  ///////////////////
  var square1 = [[0, 0], [1, 0], [0, 1], [1, 1]];
  var square = [square1];

  var normalL1 = [[0, 0], [0, 1], [0, 2], [1, 2]];
  var normalL2 = [[-1, 1], [0, 1], [1, 1], [-1, 2]];
  var normalL3 = [[-1, 0], [0, 0], [0, 1], [0, 2]];
  var normalL4 = [[-1, 1], [0, 1], [1, 1], [1, 0]];
  var normalL = [normalL1, normalL2, normalL3, normalL4];

  var reversedL1 = [[0, 0], [0, 1], [0, 2], [-1, 2]];
  var reversedL2 = [[-1, 0], [-1, 1], [0, 1], [1, 1]];
  var reversedL3 = [[0, 0], [1, 0], [0, 1], [0, 2]];
  var reversedL4 = [[-1, 1], [0, 1], [1, 1], [1, 2]];
  var reversedL = [reversedL1, reversedL2, reversedL3, reversedL4];

  var line1 = [[-1, 0], [0, 0], [1, 0], [2, 0]];
  var line2 = [[0, -1], [0, 0], [0, 1], [0, 2]];
  var line3 = [[-2, 0], [-1, 0], [0, 0], [1, 0]];
  var line = [line1, line2, line3, line2];

  var tee1 = [[-1, 0], [0, 0], [1, 0], [0, 1]];
  var tee2 = [[0, -1], [-1, 0], [0, 0], [0, 1]];
  var tee3 = [[0, -1], [-1, 0], [0, 0], [1, 0]];
  var tee4 = [[0, -1], [0, 0], [0, 1], [1, 0]];
  var tee = [tee1, tee2, tee3, tee4];

  var normalZ1 = [[-1, 0], [0, 0], [0, 1], [1, 1]];
  var normalZ2 = [[0, -1], [0, 0], [-1, 0], [-1, 1]];
  var normalZ3 = [[-1, -1], [0, -1], [0, 0], [1, 0]];
  var normalZ4 = [[1, -1], [0, 0], [1, 0], [0, 1]];
  var normalZ = [normalZ1, normalZ2, normalZ3, normalZ4];

  var reversedZ1 = [[-1, 1], [0, 1], [0, 0], [1, 0]];
  var reversedZ2 = [[-1, -1], [-1, 0], [0, 0], [0, 1]];
  var reversedZ3 = [[-1, 0], [0, 0], [0, -1], [1, -1]];
  var reversedZ4 = [[0, -1], [0, 0], [1, 0], [1, 1]];
  var reversedZ = [reversedZ1, reversedZ2];

  this.pieces = [square, normalL, reversedL, line, tee, normalZ, reversedZ];
  this.colors = ['r', 'y', 'y', 'b', 'o', 'g', 'g'];
  this.currentPiece = {piece: 0, rotate: 0};

  this.activeGame = false;
  this.data = {
    score: 0,
    level: 1,
    rowsCleared: 0,
    active: false,
    paused: false,
    ended: false
  };

  //Sets this.field to an empty field
  this.resetField = function() {
    this.field = [];
    for (var i = 0; i < this.boardHeight; i++) {
      this.field.push(this.row.slice());
    }
    this.rendered = this.field;
  };

  this.resetAnchor = function() {
    this.anchor = [Math.floor((this.row.length - 1) / 2), 0];
  };

  this.piece = function(piece) {
    piece = piece || this.currentPiece;
    return this.pieces[piece.piece][piece.rotate];
  };

  this.pieceColor = function(piece) {
    piece = piece || this.currentPiece;
    return this.colors[piece.piece];
  };

  //Begin game
  this.start = function(demo) {
    if (this.nextTick) {
      this.cancelTick();
    }

    this.interval = this.startInterval;
    this.data.score = 0;
    this.data.level = 1;
    this.data.rowsCleared = 0;
    this.holdPiece = null;

    this.resetAnchor();
    this.resetField();
    this.pieceQueue = [this.randomPiece(), this.randomPiece(), this.randomPiece(), this.randomPiece(), this.randomPiece()];
    this.nextPiece();
    this.scheduleTick();
    this.activeGame = true;
    if (!demo) {
      this.data.active = true;
    }
    this.data.ended = false;
  };

  this.togglePause = function() {
    if (this.data.paused) {
      this.scheduleTick();
      this.data.paused = false;
    } else {
      this.cancelTick();
      this.data.paused = true;
    }
    this.renderField();
  };

  this.randomPiece = function() {
    var piece = {};
    piece.piece = Math.floor(Math.random() * this.pieces.length);
    piece.rotate = 0;
    return piece;
  };

  this.nextPiece = function() {
    this.currentPiece = this.pieceQueue.shift();
    this.pieceQueue.push(this.randomPiece());
    this.holdLock = false;
    this.renderField();
  };

  this.moveLeft = function() {
    var proposedAnchor = this.anchor.slice();
    proposedAnchor[X]--;
    if (!this.checkHorizontalConflicts(this.piece(), proposedAnchor, this.field)) {
      this.anchor = proposedAnchor;
      this.renderField();
    }
  };

  this.moveRight = function() {
    var proposedAnchor = this.anchor.slice();
    proposedAnchor[X]++;
    if (!this.checkHorizontalConflicts(this.piece(), proposedAnchor, this.field)) {
      this.anchor = proposedAnchor;
      this.renderField();
    }
  };

  this.moveDown = function() {
    this.cancelTick();
    this.tick();
  };

  this.dropPiece = function() {
    this.cancelTick();
    this.findBottom();
    this.bottom.forEach(coord => this.setValAtCoords(this.field, coord[X], coord[Y], this.pieceColor()));
    this.resetAnchor();
    this.clearRows();
    this.nextPiece();
    this.scheduleTick();
  };

  this.rotatePiece = function() {
    var nextPiece = {piece: this.currentPiece.piece};
    if (this.currentPiece.rotate < this.pieces[this.currentPiece.piece].length - 1) {
      nextPiece.rotate = this.currentPiece.rotate + 1;
    } else {
      nextPiece.rotate = 0;
    }
    nextPieceDef = this.pieces[nextPiece.piece][nextPiece.rotate];

    if (this.checkVerticalConflicts(nextPieceDef, this.anchor, this.field)) {
      return;
    }
    if (this.checkHorizontalConflicts(nextPieceDef, this.anchor, this.field)) {
      return;
    }
    this.currentPiece = nextPiece;
    this.renderField();
  };

  this.swapPiece = function() {
    if (!this.holdLock) {
      this.cancelTick();
      if (this.holdPiece) {
        var temp = this.holdPiece;
        this.holdPiece = this.currentPiece;
        this.currentPiece = temp;
      } else {
        this.holdPiece = this.currentPiece;
        this.nextPiece();
      }
      this.tick();
      this.resetAnchor();
      this.renderField();
      this.holdLock = true;
    }
  };

  this.setValAtCoords = function(matrix, x, y, val) {
    matrix[y][x] = val;
  };

  this.getValAtCoords = function(matrix, x, y) {
    return matrix[y][x];
  };

  this.mapPieceToAnchor = function(piece, anchor) {
    return piece.map(coord => [anchor[X] + coord[X], anchor[Y] + coord[Y]]);
  };

  this.renderField = function() {
    this.findBottom();
    //Create a copy of the field with only static pieces on the bottom
    var renderedField = JSON.parse(JSON.stringify(this.field));

    if (this.ghostEnabled) {
      //Place the ghost piece on the field
      this.bottom.forEach(coord => this.setValAtCoords(renderedField, coord[X], coord[Y], 'ghost'));
    }

    //Get the coordinates of the active piece
    var mappedPiece = this.mapPieceToAnchor(this.piece(), this.anchor);
    //Place the active piece on the field
    mappedPiece.forEach(coord => this.setValAtCoords(renderedField, coord[X], coord[Y], this.pieceColor()));

    this.renderCB(renderedField, this.renderQueue());
  };

  this.renderQueue = function() {
    var row = [0, 0, 0, 0, 0];
    var holdRow = ['hold', 'hold', 'hold', 'hold', 'hold'];
    var queue = [holdRow.slice(), holdRow.slice(), holdRow.slice(), holdRow.slice(), holdRow.slice(), row.slice()];
    for (var i = 0; i < 4 * this.pieceQueue.length; i++) {
      queue.push(row.slice());
    }
    var pieces = [this.holdPiece].concat(this.pieceQueue);
    pieces.forEach(function(piece, i) {
      var mappedPiece = this.mapPieceToAnchor(piece ? this.piece(piece) : [], [2, 4 * i + 2]);
      var color = this.pieceColor(piece);
      mappedPiece.forEach( coord => this.setValAtCoords(queue, coord[X], coord[Y], color));
    }.bind(this));
    return queue;
  };

  this.checkVerticalConflicts = function(piece, anchor) {
    var mappedPiece = this.mapPieceToAnchor(piece, anchor);
    //If any element of the piece is out of bounds,
    if (mappedPiece.some(coord => coord[Y] < 0 || coord[Y] >= this.boardHeight)) {
      //Conflict
      return true;
    }

    //If any element of the piece is going to touch a static block
    if (mappedPiece.some(coord => this.getValAtCoords(this.field, coord[X], coord[Y]))) {
      //The piece has landed
      return true;
    }
    return false;
  };


  this.checkHorizontalConflicts = function(piece, anchor) {
    var mappedPiece = this.mapPieceToAnchor(piece, anchor);
    if (mappedPiece.some(coord => coord[X] < 0 || coord[X] >= this.row.length)) {
      return true;
    }

    //If any element of the piece is going to touch a static block
    var mappedPiece = this.mapPieceToAnchor(piece, anchor);
    if (mappedPiece.some(coord => this.getValAtCoords(this.field, coord[X], coord[Y]))) {
      //The piece has landed
      return true;
    }
    return false;
  };

  this.findBottom = function() {
    var proposedAnchor = this.anchor.slice();
    var piece = this.piece();
    do {
      proposedAnchor[Y]++;
    }
    while (!this.checkVerticalConflicts(piece, proposedAnchor));
    proposedAnchor[Y]--;
    this.bottom = this.mapPieceToAnchor(piece, proposedAnchor);
  };

  this.clearRows = function() {
    var cleared = 0;
    this.field.forEach(function(row, j) {
      if (row.every(cell => cell ? true : false)) {
        this.field.splice(j, 1);
        this.field.unshift(this.row.slice());
        cleared++;
      }
    }.bind(this));

    //Score 100pts per row;
    this.data.score += 100 * cleared;
    if (cleared === 4) {
      this.data.score += 400;
    }

    //Level up every ten rows (increase speed)
    this.data.rowsCleared += cleared;
    if (this.data.rowsCleared >= this.data.level * this.rowsPerLevel) {
      this.data.level ++;
      console.log('Level up:', this.data.level);
      if (this.interval - this.intervalChangeOnLevelUp >= this.minInterval) {
        this.interval -= this.intervalChangeOnLevelUp;
      }
    }
  };

  this.scheduleTick = function() {
    this.nextTick = setTimeout(this.tick.bind(this), this.interval);
  };

  this.cancelTick = function() {
    clearTimeout(this.nextTick);
  };

  this.tick = function() {
    var proposedAnchor = this.anchor.slice();
    proposedAnchor[Y]++;
    if (this.checkVerticalConflicts(this.piece(), proposedAnchor, this.field)) {
      //Current piece is dead
      //Make piece a part of field at its current position
      var mappedPiece = this.mapPieceToAnchor(this.piece(), this.anchor);
      mappedPiece.forEach(coord => this.setValAtCoords(this.field, coord[X], coord[Y], this.pieceColor()));

      this.clearRows();

      //If any cell in the top row is filled:
      if (this.field[0].some( col => col ? true : false)) {
        //Game over
        console.log('Game Over');
        if (this.data.active) {
          this.activeGame = false;
          this.data.active = false;
          this.data.ended = true;
          this.renderField();
        } else {
          this.start('demo');
        }
        //this.endGameCB(this.data.score);
      } else {
        //Next piece
        this.resetAnchor();
        this.nextPiece();
        this.nextTick = setTimeout(this.tick.bind(this), this.interval);
      }
    } else {
      //Move anchor down a row
      this.anchor = proposedAnchor;
      this.scheduleTick();
      this.renderField();
    }
  };

})

.service('Scores', function($http) {

  this.getScores = function() {
    return $http({
      method: 'GET',
      url: '/api/users',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function (response) {
      return response.data;
    });
  };

  this.submitScore = function(data) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {
        name: data.name,
        score: data.score //score to be configured still ******TODO******
      },
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(function(response) {
      return response.data;
    });
  };
})
.service('Storage', function() {
  this.user = null;
  this.currentUser = function(username) {
    if (username) {
      this.user = username;
      return this.user;
    } else {
      return this.user;
    }
  };
});
