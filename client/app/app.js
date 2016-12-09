// client/app/app.js
angular.module('tetris', [
  'tetris.game',
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
    .otherwise({
      redirectTo: '/game'
    });
});