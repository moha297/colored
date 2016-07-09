'use strict';

describe('Controller: ScoreboardCtrl', function () {

  // load the controller's module
  beforeEach(module('coloredApp'));

  var ScoreboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScoreboardCtrl = $controller('ScoreboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ScoreboardCtrl.awesomeThings.length).toBe(3);
  });
});
