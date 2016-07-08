'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameGrid
 * @description
 * # gameGrid
 */
angular.module('coloredApp')
  .directive('gameGrid', function() {
    return {
      templateUrl: 'views/directives/gamegrid.html',
      restrict: 'E',
      scope: {
        matrix: "=matrix"
      },
      link: function postLink(scope, element, attrs) {
        // value  is expected in pixels but is a number;
        var cellDimension, cellHeight, gridWidth = attrs['width'];
        if (!parseInt(gridWidth)) {
          throw "Grid Width is not a number";
        }
        scope.gridWidth=gridWidth;
        scope.gridData = [];
        function paint() {
          //assume that the number of columns is same across matrix.
          // @todo - inject validation of grid data
          var rows = scope.matrix.length,
          cols = scope.matrix[0].length;
          cellDimension = gridWidth/rows;
          scope.dimension = cellDimension;
        }
        scope.$watch('matrix', function(newValue, oldValue) {
          paint();
        });
      }
    };
  });
