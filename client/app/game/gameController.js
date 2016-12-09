// client/app/game/gameController.js
angular.module('tetris.game', [])

.controller('GameController', function($scope, logic) {
  $scope.matrix = logic.rendered;
  console.log(JSON.stringify($scope.matrix));
  $scope.skip = true;

  logic.renderCB = function(matrix) {
    $scope.matrix = matrix;
    if (!$scope.skip) {
      $scope.$apply();
    } else {
      $scope.skip = false;
    }
  };

  //Start:
  logic.anchor = logic.start();
  logic.randomPiece();
  logic.tick(logic.piece, logic.anchor, logic.field, 800);
  
  // var color = function(spot) {
  //   console.log(spot);
  //   return spot === 1 ? 'red' : 'blue';
  // };

}); 