describe('ToDoController', function() {

  var ctrl;
  var httpBackend;
  var scope;

  var submitSpy = jasmine.createSpyObj('submitSpy', ['new']);
  var listSpy = jasmine.createSpyObj('listSpy', ['toDos']);
  var deleteSpy = jasmine.createSpyObj('deleteSpy', ['remove']);
  var editSpy = jasmine.createSpyObj('editSpy', ['selectForEditing', 'editToDo']);
  var task = 'Thing to do';

  beforeEach(module('ToDo'));

  beforeEach(inject(function($rootScope, $controller, $httpBackend, $q) {
    listSpy.toDos.and.returnValue($q.when({data: ["task"]}))
    var scope = $rootScope.$new()
    ctrl = $controller('ToDoController', {
      $scope: scope,
      Submit: submitSpy,
      List: listSpy,
      Delete: deleteSpy,
      Edit: editSpy
    });
    httpBackend = $httpBackend;

  }));

  it('initialises with an empty todo list', function() {
    expect(ctrl.toDos).toBeUndefined();
  });

  it('passes a submitted task to the submit factory', function() {
    ctrl.draftToDo = task;
    ctrl.addToDo();
    expect(submitSpy.new).toHaveBeenCalledWith(task);
  });

  it('delegates requesting todos to the list factory', function() {
    ctrl.getToDos();
    expect(listSpy.toDos).toHaveBeenCalled();
  });

  it('delegates deleting todos to the delete factory', function() {
    ctrl.deleteToDo(task);
    expect(deleteSpy.remove).toHaveBeenCalledWith(task);
  });

  it('shows the edit field for a selected task via edit factory', function() {
    ctrl.showEditField(task);
    expect(editSpy.selectForEditing).toHaveBeenCalledWith(task);
  });

  it('delegates editig todos to the edit factory', function() {
    ctrl.editToDo(task);
    expect(editSpy.editToDo).toHaveBeenCalledWith(task);
  })



});
