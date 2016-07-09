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
      replace:true,
      scope: {
        matrix: "=matrix",
        validator: "=validator"
      },
      link: function postLink(scope, element, attrs) {

        var availableWidth = element.width();

        // value  is expected in pixels but is a number;
        var cellDimension, cellHeight;

        scope.gridData = [];
        // lets paint the town
        function paint() {
          //assume that the number of columns is same across matrix.
          // @todo - inject validation of grid data
          var rows = scope.matrix.length,
            cols = scope.matrix[0].length;
          cellDimension = availableWidth / cols;
          scope.dimension = cellDimension;
        }

        // Paint when data is ready
        scope.$watch('matrix', function(newValue, oldValue) {
          paint();
        });

        element.click(function(e) {
          // We need to run things in angular world
          scope.$apply(function() {
            var targetNode = e.target;
            var rowCol = targetNode.id.split(',');
            scope.validator(scope.matrix[rowCol[0]][rowCol[1]]);
          });
        });
      }
    };
  });
