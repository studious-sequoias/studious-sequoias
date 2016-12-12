// client/app/app.js
angular.module('tetris', [
  'tetris.game',
  'tetris.scores',
  'tetris.services',
  'ngRoute',
  'mydirectives'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/game', {
      templateUrl: 'app/game/game.html',
      controller: 'GameController'
    })
    .when('/scores', {
      templateUrl: 'app/scores/scores.html',
      controller: 'ScoresController'
    })
    .when('/help', {
      templateUrl: 'app/help.html'
    })
    .otherwise({
      redirectTo: '/game'
    });
});