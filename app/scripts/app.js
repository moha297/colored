'use strict';

/**
 * @ngdoc overview
 * @name coloredApp
 * @description
 * # coloredApp
 *
 * Main module of the application.
 */
angular
  .module('coloredApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function($routeProvider, localStorageServiceProvider) {

    localStorageServiceProvider.setPrefix('ca-settings');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve:{
          gameSettings: function(gameSettingService){
            return gameSettingService.getAllSettings();
          }
        }
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        resolve:{
          gameSettings: function(gameSettingService){
            return gameSettingService.getAllSettings();
          }
        }
      })
      .when('/scoreboard', {
        templateUrl: 'views/scoreboard.html',
        controller: 'ScoreboardCtrl',
        controllerAs: 'scoreboard',
        resolve:{
          scoreBoard: function(scorecardService){
            return scorecardService.getAllScores();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
