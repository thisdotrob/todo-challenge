describe('getFactory', function() {
  var httpBackend;
  var get;

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Get) {
    httpBackend = $httpBackend;
    get = Get;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('retrieves the list of todos', function() {
    httpBackend.expectGET('/todos').respond(200);
    get.toDos();
    httpBackend.flush();
  })

});
