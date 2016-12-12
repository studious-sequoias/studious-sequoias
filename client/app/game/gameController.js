// client/app/game/gameController.js
angular.module('tetris.game', [])

.controller('GameController', function($scope, logic, Scores) {
  $scope.matrix = logic.rendered;

  $scope.data = logic.data;

  $scope.skip = true;

  $scope.startGame = function() {
    // setTimeout(function() {
    //   $scope.endGame(); // function to use to initiate game over
    // }, 1000);
    if (!logic.activeGame) {
      logic.start();
    } else {
      logic.renderField();
    }
  };

  logic.endGameCB = function(score) {
    $scope.endGame(score);
  };

  $scope.submitScore = function() {
    if ($scope.name) {
      Scores.submitScore({name: $scope.name, score: $scope.data.score})
      .then(function(response) {
        console.log(response);
      });
    }
  };

  logic.renderCB = function(matrix, queue) {
    $scope.matrix = matrix;
    $scope.queue = queue;
    if (!$scope.skip) {
      $scope.$apply();
    } else {
      $scope.skip = false;
    }
  };

})
.controller('ClickController', function($scope, logic) {
  $scope.onKeydown = function(keycode) {
    if (logic.activeGame) {
      if (keycode === 37) { //LEFT
        logic.moveLeft();
      } else if (keycode === 38) { //UP
        logic.rotatePiece();
      } else if (keycode === 39) { //RIGHT
        logic.moveRight();
      } else if (keycode === 40) { //DOWN
        logic.moveDown();
      } else if (keycode === 16) { //SHIFT
        logic.swapPiece();
      } else if (keycode === 32) { //SPACE
        logic.dropPiece();
      } else if (keycode === 71) { //'g'
        logic.ghostEnabled = !logic.ghostEnabled;
      }
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

mod.directive('removeOnClick', function($rootScope) {
  return {
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        elem.remove();
      });
    }
  };
});

mod.directive('addElem', function($compile) {
  return {
    link: function(scope, elem, attrs) {
      scope.endGame = function() {
        var el = angular.element('<span/>');
        el.append('<div remove-on-click><ul ng-click="submitScore()"><li><a href="#/">SUBMIT</a></li></ul></br><input id="nameEntry" type="text" ng-model="name"></div><script>document.getElementById("nameEntry").focus()</script>');
        $compile(el)(scope);
        elem.append(el);
      };
    }
  };
});
