'use strict';

/**
 * @ngdoc service
 * @name coloredApp.gameSettingService
 * @description
 * # gameSettingService
 * Service in the coloredApp.
 */
angular.module('coloredApp')
  .service('gameSettingService', function($q, localStorageService) {
    var settingKeyName = 'game_settings',
      currentSettings = {},
      defaultSettings = {
        'rows': 4,
        'cols': 4,
        'count': 5,
        'attempts': 3,
        'time': 5 //in seconds
      }
      // AngularJS will instantiate a singleton by calling "new" on this function
    function _getAllSettings() {
      return $q(function(resolve, reject) {
        currentSettings = localStorageService.get(settingKeyName);
        if (!currentSettings) {
          localStorageService.set(settingKeyName, defaultSettings);
          // refetch from storage
          currentSettings = localStorageService.get(settingKeyName);
        }
        resolve(currentSettings);
      });
    }

    function _saveSetting(key, value) {
      currentSettings[key] = value;
      localStorageService.set(settingKeyName, currentSettings);
    }

    function _reset() {
      localStorageService.set(settingKeyName, defaultSettings);
      // refetch from storage
      currentSettings = localStorageService.get(settingKeyName);
    }
    return {
      getAllSettings: _getAllSettings,
      reset: _reset,
      saveSetting: _saveSetting
    }
  });
