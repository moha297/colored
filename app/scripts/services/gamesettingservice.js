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
      //Default values for a new user
      defaultSettings = {
        'rows': 4,
        'cols': 4,
        'count': 5,
        'attempts': 3,
        'time': 5 //in seconds
      };
      // AngularJS will instantiate a singleton by calling "new" on this function
    function _getAllSettings() {
      return $q(function(resolve/*, reject*/) {
        currentSettings = localStorageService.get(settingKeyName);
        // if the value is not found - resort to setting a defaultSettings object
        if (!currentSettings) {
          localStorageService.set(settingKeyName, defaultSettings);
          // refetch from storage
          currentSettings = localStorageService.get(settingKeyName);
        }
        resolve(currentSettings);
      });
    }

    //Save a setting key value pair to game settings
    function _saveSetting(key, value) {
      currentSettings[key] = value;
      localStorageService.set(settingKeyName, currentSettings);
    }

    /**
     * Can save multiple settings together
     * Over here we are iterating and calling localStorage update multiple times
     * In ideal world,
     * we will update to api and the api should update only the values it knows and recieves
     */
    function _saveManySettings(map) {
      for (var key in map) {
        _saveSetting(key, map[key]);
      }
    }

    function _reset() {
      localStorageService.set(settingKeyName, defaultSettings);
      // refetch from storage
      currentSettings = localStorageService.get(settingKeyName);
    }

    // This will expose what is needed for the service interface in the  app
    return {
      getAllSettings: _getAllSettings,
      reset: _reset,
      saveSetting: _saveSetting,
      saveManySettings: _saveManySettings
    };
  });
