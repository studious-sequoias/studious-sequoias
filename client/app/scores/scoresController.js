angular.module('tetris.scores', [])

.controller('ScoresController', function($scope, Scores) {

  $scope.data = {};

  var initializeScores = function() {
    $scope.data.scores = Scores.getScores();
  };
  initializeScores();

  $scope.data.scores = [
    {
      user: 'suhail idrees',
      score: '100'
    },
    {
      user: 'zachary weidenbach',
      score: '90'
    },
    {
      user: 'casey hungler',
      score: '80'
    },
    {
      user: 'steven jing',
      score: '70'
    }
  ];

});