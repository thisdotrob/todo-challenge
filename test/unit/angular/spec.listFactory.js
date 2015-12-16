describe('listFactory', function() {
  var httpBackend;
  var list;

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, List) {
    httpBackend = $httpBackend;
    list = List;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('retrieves the list of todos', function() {
    var data = {
      todos: [
        {task: 'task 1'},
        {task: 'task 2'}
      ]
    }
    httpBackend.expectGET('/list').respond(data);
    list.toDos();
    httpBackend.flush();
  })

});
