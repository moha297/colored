'use strict';

describe('Directive: gameBoard', function () {

  // load the directive's module
  beforeEach(module('coloredApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<game-board></game-board>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gameBoard directive');
  }));
});
