describe('deleteFactory', function() {
  var httpBackend;
  var del;

  var selection = {
    '01234': true,
    '56789': false,
  };

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Delete) {
    httpBackend = $httpBackend;
    del = Delete;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('deletes the specified todo', function() {
    httpBackend.expectPOST('/delete', selection).respond(200);
    del.remove(selection);
    httpBackend.flush();
  });

});
