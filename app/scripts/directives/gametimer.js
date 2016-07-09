'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameTimer
 * @description
 * # gameTimer
 */
angular.module('coloredApp')
  .directive('gameTimer', ['$interval', function($interval) {
    return {
      templateUrl: 'views/directives/gametimer.html',
      restrict: 'E',
      require: '^gameBoard',
      scope: {
        timeout: "&timeout",
        timelimit: "=timelimit"
      },
      link: function postLink(scope, element, attrs, controller) {

        var timeStart,
          timeEnd,
          clock,
          limit = scope.timelimit;


        // Add communication interface to the controller layer
        controller.getLastRemainingTime = function() {
          var curTime = new Date();
          var dif = curTime.getTime() - timeStart.getTime();
          //:P
          if (dif >= limit) {
            dif = 0;
          }
          return dif;
        }
        controller.getTimeTakenTillNow = function() {
          var curTime = new Date();
          var dif = curTime.getTime() - timeStart.getTime();
          //:P
          if (dif >= limit) {
            return limit;
          } else {
            return dif;
          }

        }

        // Trigger the game start as soon as timer is ready to go
        function startCountDown() {
          timeStart = new Date();
          if (clock) {
            $interval.cancel(clock);
          }
          clock = $interval(function() {
            var curTime = new Date();
            var dif = curTime.getTime() - timeStart.getTime()
            if (dif >= scope.timelimit) {
              scope.timeout();
              $interval.cancel(clock);
              scope.timer = 0;
            } else {
              scope.timer = scope.timelimit - dif;
            }
            // Tell the controller if needed
            controller.setLastRemainingTime(dif);
          }, 100)
        }
        //trigger the game
        scope.$watch('timelimit', function() {
          scope.timer = scope.timelimit;
          startCountDown();
        });

        //cleanup
        scope.$on('$destroy', function() {
          $interval.cancel(clock);
        });
      }
    };
  }]);
