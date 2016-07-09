'use strict';

describe('Service: scorecardService', function () {

  // load the service's module
  beforeEach(module('coloredApp'));

  // instantiate service
  var scorecardService;
  beforeEach(inject(function (_scorecardService_) {
    scorecardService = _scorecardService_;
  }));

  it('should do something', function () {
    expect(!!scorecardService).toBe(true);
  });

});
