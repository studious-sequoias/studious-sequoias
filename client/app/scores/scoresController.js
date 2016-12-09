angular.module('tetris.scores', [])

.controller('ScoresController', function($scope, Scores) {

  $scope.data = {};

  var initializeScores = function() {
    Scores.getScores()
      .then(function(users) {
        $scope.data.users = users;
      })
      .catch(function(error) {
        console.error(error);
        throw error;
      });
  };
  initializeScores();
  
});