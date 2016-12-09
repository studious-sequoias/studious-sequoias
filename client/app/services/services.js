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

  this.piece = [[0, 0], [1, 0], [1, 1], [2, 1]];
  this.pieceColor = 'g';

  this.start = function() {
    return [2, 0];
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
    var mappedPiece = this.mapPieceToAnchor(piece, anchor);
    //Place the active piece on the field
    mappedPiece.forEach(coord => this.setValAtCoords(renderedField, coord[X], coord[Y], this.pieceColor));
    
    this.renderCB(renderedField);
  };

  this.checkVerticalConflicts = function(piece, anchor, field) {
    var mappedPiece = this.mapPieceToAnchor(piece, anchor);
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
    this.renderField(piece, anchor, field);
    if (this.checkVerticalConflicts(piece, anchor, field)) {
      //Current piece is dead
      //Make piece a part of field at its current position
      var mappedPiece = this.mapPieceToAnchor(piece, anchor);
      mappedPiece.forEach(coord => this.setValAtCoords(field, anchor[X], anchor[Y], this.pieceColor));

      //TODO:  Clear rows if filled
      //TODO:  If game not over

        //TODO: Add next piece

    } else {
      //Move anchor down a row
      this.anchor[Y]++;
      console.log(interval);
      setTimeout(this.tick.bind(this, piece, anchor, field, interval), interval);
    }

  };
  
})

.service('Scores', function($http) {

  this.getScores = function() {
    $http({
      method: 'GET',
      url: '/api/users'
    }).then(function (response) {
      return response.data;
    });
  }


});






























