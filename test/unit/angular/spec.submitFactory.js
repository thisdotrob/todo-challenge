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

  it('submits a POST on ToDo submission', function() {
    var task = 'Thing to do';
    httpBackend.expectPOST('/', {task: task}).respond(200, 'success');
    submit.post(task);
    httpBackend.flush();
  });

});
