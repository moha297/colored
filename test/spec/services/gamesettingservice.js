'use strict';

describe('Service: gameSettingService', function () {

  // load the service's module
  beforeEach(module('coloredApp'));

  // instantiate service
  var gameSettingService;
  beforeEach(inject(function (_gameSettingService_) {
    gameSettingService = _gameSettingService_;
  }));

  it('should do something', function () {
    expect(!!gameSettingService).toBe(true);
  });

});
