// client/app/services/services.js
angular.module('tetris.services', [])

.service('logic', function() {
  ///////////////////
  //BOARD DEFINITIONS
  ///////////////////
  this.row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.boardHeight = 13;

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
  this.piece = this.pieces[0][0];
  this.pieceColor = 'g';

  this.activeGame = false;
  this.data = {};
  this.data.score = 0;

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

  //Begin game
  this.start = function() {
    this.resetAnchor(); 
    this.resetField();
    this.randomPiece();
    this.interval = 800;
    this.tick();
    this.activeGame = true;
  };

  this.randomPiece = function() {
    this.currentPiece.piece = Math.floor(Math.random() * this.pieces.length);
    this.currentPiece.rotate = 0;
    this.piece = this.pieces[this.currentPiece.piece][0];
    this.pieceColor = this.colors[this.currentPiece.piece];
  };

  this.moveLeft = function() {
    var proposedAnchor = this.anchor.slice();
    proposedAnchor[X]--;
    if (!this.checkHorizontalConflicts(this.piece, proposedAnchor, this.field)) {
      this.anchor = proposedAnchor;
      this.renderField(this.piece, this.anchor, this.field);
    }
  };

  this.moveRight = function() {
    var proposedAnchor = this.anchor.slice();
    proposedAnchor[X]++;
    if (!this.checkHorizontalConflicts(this.piece, proposedAnchor, this.field)) {
      this.anchor = proposedAnchor;
      this.renderField(this.piece, this.anchor, this.field);
    }
  };

  this.moveDown = function() {
    clearTimeout(this.nextTick);
    this.tick(this.piece, this.anchor, this.field, this.interval);
  };

  this.rotatePiece = function() {
    var nextPiece = {piece: this.currentPiece.piece};
    var nextPieceDef = [];
    if (this.currentPiece.rotate < this.pieces[this.currentPiece.piece].length - 1) {
      nextPiece.rotate = this.currentPiece.rotate + 1;
    } else {
      nextPiece.rotate = 0;
    }
    nextPieceDef = this.pieces[nextPiece.piece][nextPiece.rotate];

    if (this.checkHorizontalConflicts(nextPieceDef, this.anchor, this.field)) {
      return;
    }
    if (this.checkVerticalConflicts(nextPieceDef, this.anchor, this.field)) {
      return;
    }
    this.currentPiece = nextPiece;
    this.piece = nextPieceDef;
    this.renderField(this.piece, this.anchor, this.field);
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
    //Create a copy of the field with only static pieces on the bottom
    var renderedField = JSON.parse(JSON.stringify(this.field));
    //Get the coordinates of the active piece
    var mappedPiece = this.mapPieceToAnchor(this.piece, this.anchor);
    //Place the active piece on the field
    mappedPiece.forEach(coord => this.setValAtCoords(renderedField, coord[X], coord[Y], this.pieceColor));
    this.renderCB(renderedField);
  };

  this.checkVerticalConflicts = function(piece, anchor) {
    var mappedPiece = this.mapPieceToAnchor(this.piece, anchor);
    //If any element of the piece is out of bounds, 
    if (mappedPiece.some(coord => coord[Y] >= this.boardHeight)) {
      //The piece has bottomed out
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

  this.tick = function() {
    this.renderField();
    var proposedAnchor = this.anchor.slice();
    proposedAnchor[Y]++;
    if (this.checkVerticalConflicts(this.piece, proposedAnchor, this.field)) {
      //Current piece is dead
      //Make piece a part of field at its current position
      var mappedPiece = this.mapPieceToAnchor(this.piece, this.anchor);
      mappedPiece.forEach(coord => this.setValAtCoords(this.field, coord[X], coord[Y], this.pieceColor));
      
      //Clear completed rows
      var score = 0;
      this.field.forEach(function(row, j) {
        if (row.every(cell => cell ? true : false)) {
          this.field.splice(j, 1);
          this.field.unshift(this.row.slice());
          score += 100;
        }
        //If one move clears four rows, that move scores double (800 pts);
        if (score === 400) {
          score *= 2;
        }
      }.bind(this));
      this.data.score += score;

      //If any cell in the top row is filled:
      if (this.field[0].some( col => col ? true : false)) {
        //Game over
        console.log('Game Over');
        this.activeGame = false;
      } else {
        //Next piece
        this.randomPiece();
        this.resetAnchor();
        this.nextTick = setTimeout(this.tick.bind(this), this.interval);
      }
    } else {
      //Move anchor down a row
      this.anchor = proposedAnchor;
      this.nextTick = setTimeout(this.tick.bind(this), this.interval);
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
      console.log('response', response.data);
      return response.data;
    });
  }


});






























