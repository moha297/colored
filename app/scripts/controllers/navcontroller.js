'use strict';

/**
 * @ngdoc function
 * @name coloredApp.controller:NavcontrollerCtrl
 * @description Highlighting of nav bar etc
 * # NavcontrollerCtrl
 * Controller of the coloredApp
 */
angular.module('coloredApp')
  .controller('NavcontrollerCtrl', function($scope) {
    var pathValue;
    // Why create directives and watches. Do some old school jquery for fun
    $scope.$on("$routeChangeSuccess", function(event, next, current) {
      pathValue = next.$$route.originalPath;
      $('.navbar-nav li').removeClass('active')
      $('.navbar-nav li a[href="#'+pathValue+'"]').parent().addClass('active');
    });

  });
