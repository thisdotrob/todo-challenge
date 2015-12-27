describe('ToDoController', function() {

  var ctrl;
  var httpBackend;
  var scope;

  var newSpy = jasmine.createSpyObj('newSpy', ['toDo']);
  var getSpy = jasmine.createSpyObj('getSpy', ['toDos']);
  var deleteSpy = jasmine.createSpyObj('deleteSpy', ['remove']);
  var editSpy = jasmine.createSpyObj('editSpy', ['select', 'save']);

  var toDo = {
    task: 'Thing to do',
    category: 'A category'
  };

  beforeEach(module('ToDo'));

  beforeEach(inject(function($q) {
    getSpy.toDos.and.returnValue($q.when({data: [toDo]}));
    newSpy.toDo.and.returnValue($q.when({}));
    deleteSpy.remove.and.returnValue($q.when({}));
    editSpy.save.and.returnValue($q.when({}));
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('ToDoController', {
      $scope: scope,
      New: newSpy,
      Get: getSpy,
      Delete: deleteSpy,
      Edit: editSpy,
    });
  }));

  beforeEach(function() {
    scope.$apply();
  });

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
  }));


  it('gets pre-entered todos when initialised', function() {
    expect(getSpy.toDos).toHaveBeenCalled();
    expect(ctrl.toDos).toEqual([toDo]);
  });

  it('initialises with the new and edit dialogues hidden', function() {
    expect(ctrl.editing).toBeFalsy();
    expect(ctrl.creating).toBeFalsy();
  });

  it('delegates requesting todos to the list factory', function() {
    ctrl.toDos = null;
    ctrl.list();
    scope.$apply();
    expect(getSpy.toDos).toHaveBeenCalled();
    expect(ctrl.toDos).toEqual([toDo]);
  });

  it('displays the new dialogue whilst creating a todo', function() {
      ctrl.new();
      expect(ctrl.creating).toBeTruthy();
      ctrl.task = toDo.task;
      ctrl.category = toDo.category;
      ctrl.add();
      scope.$apply();
      expect(ctrl.creating).toBeFalsy();
  });

  it('delegates creating a todo to the New factory', function() {
    ctrl.task = toDo.task;
    ctrl.category = toDo.category;
    ctrl.add();
    expect(newSpy.toDo).toHaveBeenCalledWith(toDo.task, toDo.category);
  });

  it('submitting a new todo resets the category and task', function() {
    ctrl.task = toDo.task;
    ctrl.category = toDo.category;
    ctrl.add();
    scope.$apply();
    expect(ctrl.task).toEqual(null);
    expect(ctrl.category).toEqual(null);
  });

  it('refreshes the list of todos after adding a todo', function() {
    spyOn(ctrl, 'list');
    ctrl.add();
    scope.$apply();
    expect(ctrl.list).toHaveBeenCalled();
  });

  it('selects a todo for editing', function() {
    ctrl.edit(toDo);
    expect(editSpy.select).toHaveBeenCalledWith(toDo);
    expect(ctrl.editedTask).toEqual(toDo.task);
    expect(ctrl.editedCategory).toEqual(toDo.category);
  });

  it('displays the edit dialogue whilst editing a todo', function() {
    ctrl.edit(toDo);
    expect(ctrl.editing).toBeTruthy();
    ctrl.save();
    expect(ctrl.editing).toBeFalsy();
  });

  it('saves an edited todo', function() {
    ctrl.editedTask = 'Edited task';
    ctrl.editedCategory = 'Edited category';
    ctrl.save();
    expect(editSpy.save).toHaveBeenCalledWith('Edited task', 'Edited category');
  });

  it('refreshes the list of todos after updating', function() {
    spyOn(ctrl, 'list');
    ctrl.save();
    scope.$apply();
    expect(ctrl.list).toHaveBeenCalled();
  });

  it('delegates deleting todos to the delete factory', function() {
    ctrl.delete(toDo);
    expect(deleteSpy.remove).toHaveBeenCalledWith(toDo);
  });

  it('refreshes the list of todos after deleting', function() {
    spyOn(ctrl, 'list');
    ctrl.delete(toDo);
    scope.$apply();
    expect(ctrl.list).toHaveBeenCalled();
  });

});
