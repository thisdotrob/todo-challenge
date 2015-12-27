describe('deleteFactory', function() {
  var httpBackend;
  var del;

  var toDo = {
    _id: 12345,
    task: 'Thing to do',
    category: 'A category'
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
    httpBackend.expectPOST('/delete', toDo).respond(200);
    del.remove(toDo);
    httpBackend.flush();
  });

});
