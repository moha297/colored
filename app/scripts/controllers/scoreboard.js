'use strict';

/**
 * @ngdoc function
 * @name coloredApp.controller:ScoreboardCtrl
 * @description
 * # ScoreboardCtrl
 * Controller of the coloredApp - Displays scoreboard for all games
 */
angular.module('coloredApp')
  .controller('ScoreboardCtrl', function ($scope, scoreBoard) {
    $scope.scoreBoard = scoreBoard;
    
  });
