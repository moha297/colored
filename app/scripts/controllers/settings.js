'use strict';

/**
 * @ngdoc function
 * @name coloredApp.controller:SettingsCtrl
 * @description Settings for the gameboard default. Also persists into local storage
 * # SettingsCtrl
 * Controller of the coloredApp
 */
angular.module('coloredApp')
  .controller('SettingsCtrl', function($scope, gameSettingService, gameSettings) {
    $scope.rows = gameSettings.rows;
    $scope.cols = gameSettings.cols;
    $scope.count = gameSettings.count;
    $scope.attempts = gameSettings.attempts;
    $scope.time = gameSettings.time;

    $scope.saveSettings = function() {
      gameSettingService.saveManySettings({
        rows: $scope.rows,
        cols: $scope.cols,
        count: $scope.count,
        attempts: $scope.attempts,
        time: $scope.time
      });
    };

  });
