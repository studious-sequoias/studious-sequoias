// client/app/services/services.js
angular.module('tetris.services', [])

.service('logic', function() {
  this.row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.field = [];
  for (var i = 0; i < 13; i++) {
    this.field.push(this.row.slice());
  }
  this.rendered = this.field;

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

  this.start = function() {
    return [4, 0];
  };

  this.randomPiece = function() {
    this.currentPiece.piece = Math.floor(Math.random() * this.pieces.length);
    this.currentPiece.rotate = 0;
    this.piece = this.pieces[this.currentPiece.piece][0];
    this.pieceColor = this.colors[this.currentPiece.piece];
  };

  this.rotatePiece = function() {
    if (this.currentPiece.rotate < this.pieces[this.currentPiece.piece].length - 1) {
      this.currentPiece.rotate++;
    } else {
      this.currentPiece.rotate = 0;
    }
    this.piece = this.pieces[this.currentPiece.piece][this.currentPiece.rotate];
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

  this.renderField = function(piece, anchor, field) {
    //Create a copy of the field with only static pieces on the bottom
    var renderedField = JSON.parse(JSON.stringify(field));
    //Get the coordinates of the active piece
    var mappedPiece = this.mapPieceToAnchor(this.piece, anchor);
    //Place the active piece on the field
    mappedPiece.forEach(coord => this.setValAtCoords(renderedField, coord[X], coord[Y], this.pieceColor));
    
    this.renderCB(renderedField);
  };

  this.checkVerticalConflicts = function(piece, anchor, field) {
    var mappedPiece = this.mapPieceToAnchor(this.piece, anchor);
    //If any element of the piece is currently on the bottom row, 
    if (mappedPiece.some(coord => coord[Y] === field.length - 1)) {
      //The piece has bottomed out
      return true;
    }

    //If any element of the piece is going to touch a static block
    if (mappedPiece.some(coord => this.getValAtCoords(field, coord[X], coord[Y] + 1))) {
      //The piece has landed
      return true;
    }
    return false;
  };

  this.tick = function(piece, anchor, field, interval) {
    this.renderField(this.piece, anchor, field);
    if (this.checkVerticalConflicts(this.piece, anchor, field)) {
      //Current piece is dead
      //Make piece a part of field at its current position
      var mappedPiece = this.mapPieceToAnchor(this.piece, this.anchor);
      mappedPiece.forEach(coord => this.setValAtCoords(this.field, coord[X], coord[Y], this.pieceColor));
      //TODO:  Clear rows if filled

      //If any cell in the top row is filled:
      if (field[0].some( col => col ? true : false)) {
        //Game over
        console.log('Game Over');
      } else {
        //Next piece
        this.randomPiece();
        this.anchor = this.start();
        setTimeout(this.tick.bind(this, this.piece, this.anchor, field, interval), interval);
      }
    } else {
      //Move anchor down a row
      this.anchor[Y]++;
      setTimeout(this.tick.bind(this, this.piece, anchor, field, interval), interval);
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






























