'use strict';

describe('Service: addAResource', function () {

  // load the service's module
  beforeEach(module('resourceFinderMvpApp'));

  // instantiate service
  var addAResource;
  beforeEach(inject(function (_addAResource_) {
    addAResource = _addAResource_;
  }));

  it('should do something', function () {
    expect(!!addAResource).toBe(true);
  });

});
