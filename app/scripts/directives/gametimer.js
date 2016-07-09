'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameTimer
 * @description
 * # gameTimer
 */
angular.module('coloredApp')
  .directive('gameTimer', ['$interval',function ($interval) {

    return {
      templateUrl: 'views/directives/gametimer.html',
      restrict: 'E',
      scope:{
        timeout:"=timeout",
        timelimit:"=timelimit"
      },
      link: function postLink(scope, element, attrs ) {
        var timeStart, timeEnd, clock;
        function startCountDown(){
          timeStart = new Date();
          if(clock) {
            $interval.cancel(clock);
          }
          clock = $interval(function(){
            var curTime = new Date();
            var dif = curTime.getTime() - timeStart.getTime()
            if(dif >= 9000) {
              scope.timeout();
              $interval.cancel(clock);
              scope.timer  =0;
            } else{
              scope.timer = scope.timelimit - dif;
            }
          },100)
        }
        scope.$watch('timelimit', function(){
          scope.timer=scope.timelimit;
          startCountDown();
        });

        scope.$on('$destroy', function(){
          $interval.cancel(clock);
        });
      }
    };
  }]);
