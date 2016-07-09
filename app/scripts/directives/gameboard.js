'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameBoard
 * @description
 * # gameBoard
 */
angular.module('coloredApp')
  .directive('gameBoard', ['scorecardService', function(scorecardService) {
    function GameBoardController(scope) {
      // Just a communication interface from gameTimer
      this.setLastRemainingTime = function(t) {
        scope.lastRemainingTime = t;
      }
    }
    return {
      templateUrl: 'views/directives/gameboard.html',
      restrict: 'E',
      scope: {
        settings: "=settings"
      },
      controller: ['$scope', GameBoardController],
      link: function postLink(scope, element, attrs, controller) {
        var rows = scope.settings.rows,
          cols = scope.settings.cols,
          totalCells = rows * cols,
          currentRandomCells = [],
          // We will preserve cells for score and game state persistence
          generatedRandomCells;

        // Set game name
        scope.gameName = attrs.gameName;
        scope.timeremaining;
        scope.attemptsRemaining = 0;

        // Get a score object for current run
        function getScore() {
          return {
            "win": scope.gameWin,
            "timestamp": new Date().getTime(),
            "gameSettings": JSON.stringify(scope.settings),
            "cells": generatedRandomCells,
            "timeTaken": controller.getTimeTakenTillNow()
          };
        }

        // Trigger a save on the scoreboard
        function saveScore() {
          scorecardService.saveScore(getScore(), attrs.gameName);
        }


        // Set the game board for loss
        function setLoss() {
          // No current cells so user won
          scope.gameOverlay = true;
          //decrement attempts as the user has just lost
          scope.attemptsRemaining--;
          // decide to show a loss overlay vs a try-again overlay
          if (scope.attemptsRemaining > 0) {
            scope.tryAgainOption = true;
          } else {
            scope.gameLoose = true;
          }

          scope.gameWin = false;
          scope.gameStart = false;
          // no we do not save scores for loosers
        }

        // Set the game board for win
        function setWin() {
          // No current cells so user won
          scope.gameOverlay = true;
          scope.gameWin = true;
          scope.gameLoose = false;
          scope.gameStart = false;
          scope.tryAgainOption = false;
          // We save score to record best times
          saveScore();
        }

        // Set the game board for a fresh start
        function setFirstStart() {
          // Reset game status
          scope.gameOverlay = true;
          scope.gameLoose = false;
          scope.gameWin = false;
          scope.startOption = true;
          scope.gameStart = false;
          console.log("setting attempts = ",scope.settings.attempts)
          scope.attemptsRemaining = scope.settings.attempts;
        }

        function generateRandomCells(totalCells, cellCount, currentAvailable) {
          if (!currentAvailable) {
            currentAvailable = [];
          }
          if (currentAvailable.length !== cellCount) {
            cellCount = cellCount - currentAvailable.length;
            while (cellCount > 0) {
              // randomization
              var randomVal = Math.round(Math.random() * (totalCells - 1));
              if (currentAvailable.indexOf(randomVal) === -1) {
                currentAvailable.push(randomVal);
                cellCount--;
              }
            }
          }
          generatedRandomCells = JSON.stringify(currentAvailable);
          return currentAvailable;
        }

        // game board can have a default validator or a custom validator in future
        // game grid will not decide the game status but the board does it
        function validator(cell) {
          // do whatever you want with the cell
          cell.undoSelection();
          var index = currentRandomCells.indexOf(cell.customId);

          if (index > -1) {
            currentRandomCells.splice(index, 1);
          }
          if (!currentRandomCells.length) {
            setWin();
            return true;
          } else {
            return false;
          }
        }

        // Validate on time out and set game status
        scope.timeOut = function() {
          if (currentRandomCells.length) {
            setLoss();
          }
        };
        scope.timeLimit = scope.settings.time * 1000;
        scope.validator = validator;
        scope.selectedCells = currentRandomCells;
        scope.grid = [];
        scope.gameStart = false;



        function reset(preserveRandomCells) {
          // Colors Array
          var colors = [
            'rgb(75,166,210)',
            'rgb(219,104,167)',
            'rgb(160,173,56)',
            'rgb(229,121,37)',
            'rgb(120,147,141)',
            'rgb(214,166,40)',
            'rgb(232,153,118)',
            'rgb(113,103,174)',
            'rgb(37,140,135)',
            'rgb(223,65,37)'
          ];

          //grid data
          var grid = [];



          // cell object class
          function CellObj(r, c, customId) {
            var row = r,
              col = c,
              selected = false,
              color,
              id = customId;

            function setDefaultColor() {
              color = "white";
            }
            setDefaultColor();

            // make things private and expose methods out
            return {
              customId: id,
              getRow: function() {
                return row;
              },
              getCol: function() {
                return col;
              },
              doSelection: function() {
                selected = true;
                return this;
              },
              undoSelection: function() {
                selected = false;
                setDefaultColor();
                return this;
              },
              getColor: function() {
                return color;
              },
              setRandomColor: function() {
                var index = Math.round(Math.random() * (colors.length - 1))
                color = colors[index];
                return this;
              }
            };
          }



          // Conditional over-ride the cells selection
          if (!preserveRandomCells) {
            //currentRandomCells  is reset
            currentRandomCells = [];
          }



          var counter = 0,
            randomCells = generateRandomCells(totalCells, scope.settings.count, currentRandomCells);

          // Loop through
          for (var i = 0; i < rows; i++) {
            grid[i] = [];
            for (var j = 0; j < cols; j++) {
              var cell = new CellObj(i, j, counter);
              // set color codes and selection states on cells based on random picking
              if (randomCells.indexOf(counter) > -1) {
                console.log("randomCells: ", randomCells, " counter: ", counter);
                // chained it for kicks :)
                cell.setRandomColor().doSelection();
                cell.id = counter;
              }
              // Push the cell into grid
              grid[i].push(cell);

              counter++;
            }
          }
          //update scope
          scope.grid = grid;

        }

        // expose to template
        scope.reset = reset;


        scope.startGame = function() {
          scope.gameStart = true;

          // true=win and false=lost
          scope.gameOverlay = false;
          scope.gameLoose = false;
          scope.gameWin = false;
          scope.startOption = false;
          scope.tryAgainOption = false;
        };

        scope.newGame = function() {
          // Start for once
          reset();
          setFirstStart();
        };

        // play the game
        scope.play = function() {
          reset(true);
          scope.startGame();
        };
        scope.newGame();
      }
    };
  }]);
