describe('deleteFactory', function() {
  var httpBackend;
  var del;

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Delete) {
    httpBackend = $httpBackend;
    del = Delete;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  })

  it('deletes the specified todo', function() {
    httpBackend.expectPOST('/delete', 'item to delete')
      .respond(200, '');
    del.remove('item to delete');
    httpBackend.flush();
  })

})
