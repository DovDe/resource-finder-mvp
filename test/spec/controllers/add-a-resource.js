'use strict';

describe('Controller: AddAResourceCtrl', function () {

  // load the controller's module
  beforeEach(module('resourceFinderMvpApp'));

  var AddAResourceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddAResourceCtrl = $controller('AddAResourceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddAResourceCtrl.awesomeThings.length).toBe(3);
  });
});
