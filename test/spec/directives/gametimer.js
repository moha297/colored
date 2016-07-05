'use strict';

describe('Directive: gameTimer', function () {

  // load the directive's module
  beforeEach(module('coloredApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<game-timer></game-timer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gameTimer directive');
  }));
});
