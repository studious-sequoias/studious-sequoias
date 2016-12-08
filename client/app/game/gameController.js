// client/app/game/gameController.js
angular.module('tetris.game', [])

.controller('GameController', function($scope, logic) {
  $scope.matrix = logic.rendered;
  console.log(JSON.stringify($scope.matrix));
  $scope.skip = true;

  logic.renderCB = function(matrix) {
    console.log('CALLBACKS!!!', JSON.stringify(matrix));
    // $scope.$apply();
    $scope.matrix = matrix;
    if (!$scope.skip) {
      $scope.$apply();
    } else {
      $scope.skip = false;
    }
  };

  logic.anchor = logic.start();
  logic.tick(logic.piece, logic.anchor, logic.field, 1000);

  var color = function(spot) {
    console.log(spot);
    return spot === 1 ? 'red' : 'blue';
  };

}); 