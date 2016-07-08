'use strict';

/**
 * @ngdoc directive
 * @name coloredApp.directive:gameBoard
 * @description
 * # gameBoard
 */
angular.module('coloredApp')
  .directive('gameBoard', function() {
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
          return false;
        }
        scope.validator = validator;

        scope.selectedCells = currentRandomCells;
        scope.grid = [];
        scope.play = function() {
          currentRandomCells = generateRandomCells(totalCells, cellCount, currentRandomCells);
        };

        function reset() {
          //grid data
          var grid = [];
          // cell object class
          function CellObj(r, c) {
            var row = r,
              col = c,
              selected = false,
              color;

            function setDefaultColor() {
              color = "white";
            }
            setDefaultColor();

            // make things private and expose methods out
            return {
              row:row,
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
              getColor:function(){
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
              var cell = new CellObj(i, j);
              grid[i].push(cell);

              // set color codes and selection states on cells based on random picking
              if (randomCells.indexOf(counter) > -1) {
                console.log("randomCells: ", randomCells, " counter: ", counter);
                // chained it for kicks :)
                cell.setColor("red").doSelection();
              }
              counter++;
            }
          }
          //update scope
          scope.grid = grid;

          //start play
          scope.play();
        }
        scope.reset = reset;
        reset();

      }
    };
  });
