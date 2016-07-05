'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameTimer
 * @description
 * # gameTimer
 */
angular.module('coloredApp')
  .directive('gameTimer', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the gameTimer directive');
      }
    };
  });
