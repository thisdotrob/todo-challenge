describe('completeFactory', function() {
  var httpBackend;
  var complete;

  var selection = {
    '01234': true,
    '56789': false,
  };

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Complete) {
    httpBackend = $httpBackend;
    complete = Complete;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('marks selected todos as complete', function() {
    httpBackend.expectPOST('/complete', selection).respond(200);
    complete.mark(selection);
    httpBackend.flush();
  });

})
