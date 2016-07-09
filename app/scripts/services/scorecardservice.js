'use strict';

/**
 * @ngdoc service
 * @name coloredApp.scorecardService
 * @description
 * # scorecardService
 * Service in the coloredApp. Saves the scores based on a gamename
 */
angular.module('coloredApp')
  .service('scorecardService', function () {
    // key used in local storage
    var keyName = 'game_scores';
    //Get all scores
    function _getAllScores() {
      return $q(function(resolve/*, reject*/) {
        // Always fetch data fresh
        scoreData = localStorageService.get(keyName);
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

  function _getGameScores(gameName){
    var scoreData=_getAllScores();
    if(scoreData[gameName]){
      return scoreData[gameName];
    } else {
      [];
    }
  }

    //Save score for a game
    function _saveScore(data, gameName) {
      if(!data || !gameName){
        throw "Score data and game name is required";
      }
      scoreData= _getAllScores();
      if(!scoreData[gameName]) {
        scoreData[gameName] = [];
      }
      scoreData[gameName].push(data);
      localStorageService.set(keyName, scoreData);
    }

    // This will expose what is needed for the service interface in the  app
    return {
      getAllScores: _getAllScores,
      saveScore: _saveScore
    };
  });
