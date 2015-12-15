describe('submitFactory', function() {
  var httpBackend;
  var submit;

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Submit) {
    httpBackend = $httpBackend;
    submit = Submit;
  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

  it('submits a new todo', function() {
    var task = 'Thing to do';
    httpBackend.expectPOST('/new', {task: task}).respond(200, 'success');
    submit.new(task);
    httpBackend.flush();
  });

});
