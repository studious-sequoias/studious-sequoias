var row = [0, 0, 0, 0, 0];
var field = [];
for (var i = 0; i < 5; i++) {
  field.push(row.slice());
}

var X = 0;
var Y = 1;

var piece = [[0, 0]];

var start = function() {
  return [2, 0];
};

var setValAtCoords = function(matrix, x, y, val) {
  matrix[y][x] = val;
};

var getValAtCoords = function(matrix, x, y) {
  return matrix[y][x];
};

var mapPieceToAnchor = function(piece, anchor) {
  return piece.map(coord => [anchor[X] + coord[X], anchor[Y] + coord[Y]]);
};


var renderField = function(piece, anchor, field) {
  //Create a copy of the field with only static pieces on the bottom
  var renderedField = JSON.parse(JSON.stringify(field));
  //Get the coordinates of the active piece
  var mappedPiece = mapPieceToAnchor(piece, anchor);
  //Place the active piece on the field
  mappedPiece.forEach(coord => setValAtCoords(renderedField, coord[X], coord[Y], 1));

  return renderedField;
};

var checkVerticalConflicts = function(piece, anchor, field) {
  var mappedPiece = mapPieceToAnchor(piece, anchor);
  //If any element of the piece is currently on the bottom row, 
  if (mappedPiece.some(coord => coord[Y] === field.length - 1)) {
    //The piece has bottomed out
    return true;
  }

  //If any element of the piece is going to touch a static block
  if (mappedPiece.some(coord => getValAtCoords(field, coord[X], coord[Y] + 1))) {
    //The piece has landed
    return true;
  }
  return false;
};

var tick = function(piece, anchor, field, interval) {
  console.log(renderField(piece, anchor, field));
  if (checkVerticalConflicts(piece, anchor, field)) {
    //Current piece is dead
    //Make piece a part of field at its current position
    var mappedPiece = mapPieceToAnchor(piece, anchor);
    mappedPiece.forEach(coord => setValAtCoords(field, anchor[X], anchor[Y], 1));

    //TODO:  Clear rows if filled
    //TODO:  If game not over

      //TODO: Add next piece

  } else {
    //Move anchor down a row
    anchor[Y]++;
    setTimeout(tick.bind(this, piece, anchor, field), interval);
  }

};

var anchor = start();
setValAtCoords(field, 2, 3, 1);
tick(piece, anchor, field, 1000);




