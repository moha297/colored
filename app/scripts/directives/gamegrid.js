'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameGrid
 * @description
 * # gameGrid
 */
angular.module('coloredApp')
  .directive('gameGrid', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the gameGrid directive');
      }
    };
  });
