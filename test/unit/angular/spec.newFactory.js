describe('newFactory', function() {
  var httpBackend;
  var newFactory;

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, New) {
    httpBackend = $httpBackend;
    newFactory = New;
  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

  it('submits a new todo', function() {
    var task = 'Thing to do';
    var category = 'A category';
    httpBackend
      .expectPOST('/new', {task: task, category: category})
      .respond(200);
    newFactory.toDo(task, category);
    httpBackend.flush();
  });

});
