'use strict';

/**
 * @ngdoc function
 * @name coloredApp.controller:MainCtrl
 * @description The game board is living here
 * # MainCtrl
 * Controller of the coloredApp
 */
angular.module('coloredApp')
  .controller('MainCtrl', function($scope, gameSettings) {
    $scope.settings = gameSettings;
  });
