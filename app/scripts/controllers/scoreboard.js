'use strict';

/**
 * @ngdoc function
 * @name coloredApp.controller:ScoreboardCtrl
 * @description Displays scoreboard for all games
 * # ScoreboardCtrl
 * Controller of the coloredApp
 */
angular.module('coloredApp')
  .controller('ScoreboardCtrl', function ($scope, scoreBoard) {
    $scope.scoreBoard = scoreBoard;

  });
