// client/app/game/gameController.js
angular.module('tetris.game', [])

.controller('GameController', function($scope, logic) {
  $scope.matrix = logic.rendered;

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
    logic.anchor = logic.start();
    logic.clearField();
    logic.randomPiece();
    logic.tick(logic.piece, logic.anchor, logic.field, 500);
    logic.activeGame = true;
    // logic.renderField();
  } else {
    logic.renderField(logic.piece, logic.anchor, logic.field);
  }


  // var color = function(spot) {
  //   console.log(spot);
  //   return spot === 1 ? 'red' : 'blue';
  // };

})
.controller('ClickController', function($scope, logic) {

  $scope.onKeydown = function(keycode) {
    if (keycode === 37) { //LEFT
      console.log('left');
    } else if (keycode === 38) { //UP
      console.log('up');
      logic.rotatePiece();
    } else if (keycode === 39) { //RIGHT
      console.log('right');
    } else if (keycode === 40) { //DOWN
      console.log('down');
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
