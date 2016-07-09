'use strict';

/**
 * @ngdoc service
 * @name coloredApp.scorecardService
 * @description Game score keeping. Saves the scores based on a gamename
 * # scorecardService
 * Service in the coloredApp.
 */
angular.module('coloredApp')
  .service('scorecardService', function($q, localStorageService) {
    // key used in local storage
    var keyName = 'game_scores';
    //Get all scores
    function _getAllScores() {
      return $q(function(resolve /*, reject*/ ) {
        // Always fetch data fresh
        var scoreData = localStorageService.get(keyName);
        // if the value is not found - resort to setting a defaultSettings object
        if (!scoreData) {
          //empty score card
          localStorageService.set(keyName, {});
          // refetch from storage
          scoreData = localStorageService.get(keyName);
        }
        resolve(scoreData);
      });
    }

    //Get scores for a game

    function _getGameScores(gameName) {
      var scoreData = _getAllScores();
      if (scoreData && scoreData[gameName]) {
        return scoreData[gameName];
      }
      return [];

    }

    //Save score for a game
    function _saveScore(score, gameName) {
      if (!score || !gameName) {
        throw "Score data and game name is required";
      }
      return $q(function(resolve /*, reject*/ ) {
        _getAllScores().then(function(data) {
          var scoreData = data;
          if (!scoreData[gameName]) {
            scoreData[gameName] = [];
          }
          scoreData[gameName].push(score);
          localStorageService.set(keyName, scoreData);
          resolve(localStorageService.get(keyName)[gameName]);
        });

      });


    }

    // This will expose what is needed for the service interface in the  app
    return {
      getAllScores: _getAllScores,
      saveScore: _saveScore
    };
  });
