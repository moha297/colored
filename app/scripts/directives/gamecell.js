'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameCell
 * @description
 * # gameCell
 */
angular.module('coloredApp')
  .directive('gameCell', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the gameCell directive');
      }
    };
  });
