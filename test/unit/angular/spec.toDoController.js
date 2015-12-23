describe('ToDoController', function() {

  var ctrl;
  var httpBackend;
  var scope;

  var submitSpy = jasmine.createSpyObj('submitSpy', ['new']);
  var listSpy = jasmine.createSpyObj('listSpy', ['toDos']);
  var deleteSpy = jasmine.createSpyObj('deleteSpy', ['remove']);
  var editSpy = jasmine.createSpyObj('editSpy', ['selectForEditing', 'editToDo']);
  var categoriseSpy = jasmine.createSpyObj('categoriseSpy', ['selectForCategorising', 'addCategory']);
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
      Edit: editSpy,
      Categorise: categoriseSpy
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

  it('shows the edit field for a selected todo', function() {
    expect(ctrl.editing).toBe(false);
    ctrl.showEditPanel(task);
    expect(editSpy.selectForEditing).toHaveBeenCalledWith(task);
    expect(ctrl.editing).toBe(true);
  });

  it('delegates editing todos to the edit factory', function() {
    ctrl.editedTask = task;
    ctrl.editToDo();
    expect(editSpy.editToDo).toHaveBeenCalledWith(task);
  });

  it('shows the categorise field for a selected todo', function() {
    expect(ctrl.categorising).toBe(false);
    ctrl.showCategorisePanel(task);
    expect(categoriseSpy.selectForCategorising).toHaveBeenCalledWith(task);
    expect(ctrl.categorising).toBe(true);
  });

  it('delegates categorising todos to the categorise factory', function() {
    ctrl.category = 'Category0';
    ctrl.categoriseToDo();
    expect(categoriseSpy.addCategory).toHaveBeenCalledWith('Category0');
  });

});
