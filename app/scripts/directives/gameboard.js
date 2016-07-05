'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameBoard
 * @description
 * # gameBoard
 */
angular.module('coloredApp')
  .directive('gameBoard', function() {
    return {
      templateUrl: 'views/directives/gameboard.html',
      restrict: 'E',
      scope: {
        settings: "=settings"
      },
      link: function postLink(scope, element, attrs) {
        var rows = scope.settings.rows,
          cols = scope.settings.cols,
          totalCells = rows * cols,
          // No of cells to be auto selected
          cellCount = scope.settings.count,
          currentRandomCells = [];

        function generateRandomCells(totalCells, cellCount, currentAvailable) {
          if (!currentAvailable) {
            currentAvailable = [];
          }
          if (currentAvailable.length != cellCount) {
            while (cellCount > 0) {
              var randomVal = Math.round(Math.random() * (totalCells - 1));
              if (currentAvailable.indexOf(randomVal) === -1) {
                currentAvailable.push(randomVal);
                cellCount--;
              }
            }
          }
          return currentAvailable

        }

        scope.selectedCells = currentRandomCells;

        scope.play = function() {
          currentRandomCells = generateRandomCells(totalCells, cellCount, currentRandomCells);
        }



      }
    };
  });
