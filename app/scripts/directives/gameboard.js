'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameBoard
 * @description
 * # gameBoard
 */
angular.module('coloredApp')
  .directive('gameBoard', ['scorecardService', function(scorecardService) {
    return {
      templateUrl: 'views/directives/gameboard.html',
      restrict: 'E',
      scope: {
        settings: "=settings"
      },
      link: function postLink(scope, element, attrs) {
        var rows = scope.settings.rows,
          cols = scope.settings.cols,
          totalCells = rows * cols,
          // No of cells to be auto selected
          cellCount = scope.settings.count,
          currentRandomCells = [];

        // Set the game board for loss
        function setLoss() {
          // No current cells so user won
          scope.gameOverlay = true;
          scope.gameLoose = true;
          scope.gameWin = false;
          scope.gameStart = false;
        }

        // Set the game board for win
        function setWin() {
          // No current cells so user won
          scope.gameOverlay = true;
          scope.gameWin = true;
          scope.gameLoose = false;
          scope.gameStart = false;
        }

        // Set the game board for a fresh start
        function setFirstStart() {
          // Reset game status
          scope.gameOverlay = true;
          scope.gameLoose = false;
          scope.gameWin = false;
          scope.startOption = true;
          scope.gameStart = false;
        }

        function generateRandomCells(totalCells, cellCount, currentAvailable) {
          if (!currentAvailable) {
            currentAvailable = [];
          }
          if (currentAvailable.length !== cellCount) {
            while (cellCount > 0) {
              var randomVal = Math.round(Math.random() * (totalCells - 1));
              if (currentAvailable.indexOf(randomVal) === -1) {
                currentAvailable.push(randomVal);
                cellCount--;
              }
            }
          }
          return currentAvailable;
        }

        // game board can have a default validator or a custom validator in future
        // game grid will not decide the game status but the board does it
        function validator(cell) {
          // do whatever you want with the cell
          cell.undoSelection();
          console.log(cell);
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

        scope.play = function() {
          currentRandomCells = generateRandomCells(totalCells, cellCount, currentRandomCells);
        };

        function reset() {
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
              setColor: function(c) {
                color = c;
                return this;
              }
            };
          }
          //currentRandomCells  is reset
          currentRandomCells = [];

          var counter = 0,
            randomCells = generateRandomCells(totalCells, cellCount, currentRandomCells)
          for (var i = 0; i < rows; i++) {
            grid[i] = [];
            for (var j = 0; j < cols; j++) {
              var cell = new CellObj(i, j, counter);
              // set color codes and selection states on cells based on random picking
              if (randomCells.indexOf(counter) > -1) {
                console.log("randomCells: ", randomCells, " counter: ", counter);
                // chained it for kicks :)
                cell.setColor("red").doSelection();
                cell.id = counter;
              }
              // Push the cell into grid
              grid[i].push(cell);

              counter++;
            }
          }
          //update scope
          scope.grid = grid;

          setFirstStart();

          //start play
          scope.play();
        }
        scope.reset = reset;
        reset();

        scope.startGame = function() {
          scope.gameStart = true;

          // true=win and false=lost
          scope.gameOverlay = false;
          scope.gameLoose = false;
          scope.gameWin = false;
          scope.startOption = false;
        }

      }
    };
  }]);
