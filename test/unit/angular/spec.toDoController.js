describe('ToDoController', function() {

  var ctrl;
  var httpBackend;
  var scope;

  var submitSpy = jasmine.createSpyObj('submitSpy', ['new']);
  var listSpy = jasmine.createSpyObj('listSpy', ['todos']);
  var task = 'Thing to do';

  beforeEach(module('ToDo'));

  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    var scope = $rootScope.$new()
    ctrl = $controller('ToDoController', {
      $scope: scope,
      Submit: submitSpy,
      List: listSpy
    });
    httpBackend = $httpBackend;
  }));

  it('initialises with an empty todo list', function() {
    expect(ctrl.todo).toBeUndefined();
  });

  it('passes a submitted task to the submit factory', function() {
    ctrl.draftToDo = task;
    ctrl.addToDo();
    expect(submitSpy.new).toHaveBeenCalledWith(task);
  });

  it('delegates requesting todos to the list factory', function() {
    ctrl.getToDos();
    expect(listSpy.todos).toHaveBeenCalled();
  })

});
