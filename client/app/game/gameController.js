// client/app/game/gameController.js
angular.module('tetris.game', [])

.controller('GameController', function($scope, logic) {
  $scope.matrix = logic.rendered;

  $scope.data = logic.data;

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
  if (!logic.activeGame) {
    logic.start();
  } else {
    logic.renderField(logic.piece, logic.anchor, logic.field);
  }
  
})
.controller('ClickController', function($scope, logic) {
  $scope.onKeydown = function(keycode) {
    if (keycode === 37) { //LEFT
      logic.moveLeft();
    } else if (keycode === 38) { //UP
      logic.rotatePiece();
    } else if (keycode === 39) { //RIGHT
      logic.moveRight();
    } else if (keycode === 40) { //DOWN
      logic.moveDown();
    }
  };

});

var mod = angular.module('mydirectives', []);
mod.directive('onKeydown', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var functionToCall = scope.$eval(attrs.onKeydown);
      elem.on('keydown', function(e) {
        functionToCall(e.which);
      });
    }
  };
});
