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
      var cellCount = $scope.rows * $scope.cols;

      if(cellCount<$scope.count){
        alert("Number of cells in grid need to be greater than "+$scope.count)
        return;
      }

      if(cellCount === 0 ){
        alert ("Grid should have cells - rows and cols should be more than 0");
        return;
      }


      gameSettingService.saveManySettings({
        rows: $scope.rows,
        cols: $scope.cols,
        count: $scope.count,
        attempts: $scope.attempts,
        time: $scope.time
      });
    };

  });
