describe('ToDoController', function() {

  var ctrl;
  var httpBackend;
  var scope;

  var newSpy = jasmine.createSpyObj('newSpy', ['toDo']);
  var getSpy = jasmine.createSpyObj('getSpy', ['toDos', 'categories', 'filteredToDos']);
  var deleteSpy = jasmine.createSpyObj('deleteSpy', ['remove']);
  var editSpy = jasmine.createSpyObj('editSpy', ['select', 'save']);
  var completeSpy = jasmine.createSpyObj('completeSpy', ['mark']);

  var sampleToDos = [
    {
      task: "task0",
      category: "category0"
    },
    {
      task: "task1",
      category: "category0"
    },
    {
      task: "task2",
      category: "category1"
    }
  ];

  var filteredToDos = [
    {
      task: "task2",
      category: "category1"
    }
  ];

  var categories = ['category0', 'category1'];

  beforeEach(module('ToDo'));

  beforeEach(inject(function($q) {
    getSpy.toDos.and.returnValue($q.when({data: sampleToDos}));
    getSpy.categories.and.returnValue(categories);
    getSpy.filteredToDos.and.returnValue(filteredToDos);
    newSpy.toDo.and.returnValue($q.when({}));
    deleteSpy.remove.and.returnValue($q.when({}));
    editSpy.save.and.returnValue($q.when({}));
    completeSpy.mark.and.returnValue($q.when({}));
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('ToDoController', {
      $scope: scope,
      New: newSpy,
      Get: getSpy,
      Delete: deleteSpy,
      Edit: editSpy,
      Complete: completeSpy
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
    expect(ctrl.toDos).toEqual(sampleToDos);
  });

  it('initialises with the new and edit dialogues hidden', function() {
    expect(ctrl.editing).toBeFalsy();
    expect(ctrl.creating).toBeFalsy();
  });

  it('gets the unique list of categories', function() {
    expect(getSpy.categories).toHaveBeenCalledWith(sampleToDos);
    expect(ctrl.categories).toEqual(categories);
  });

  it('is initialised with no filter', function() {
    expect(ctrl.selectedCategory).toEqual('All');
  })

  it('filters todos by the selected category', function() {
    var options = {
      toDos: sampleToDos,
      category: 'category1'
    }
    ctrl.selectedCategory = options.category;
    ctrl.toDos = options.toDos;
    ctrl.filterToDos();
    expect(getSpy.filteredToDos).toHaveBeenCalledWith(options);
    expect(ctrl.filteredToDos).toEqual(filteredToDos);
  })

  it('delegates requesting todos to the list factory', function() {
    ctrl.toDos = null;
    ctrl.list();
    scope.$apply();
    expect(getSpy.toDos).toHaveBeenCalled();
    expect(ctrl.toDos).toEqual(sampleToDos);
  });

  it('refreshes the list of categories when requesting todos', function() {
    spyOn(ctrl, 'getCategories');
    ctrl.list();
    scope.$apply();
    expect(ctrl.getCategories).toHaveBeenCalled();
  });

  it('applies the selected filter when requesting todos', function() {
    spyOn(ctrl, 'filterToDos');
    ctrl.list();
    scope.$apply();
    expect(ctrl.filterToDos).toHaveBeenCalled();
  })

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
    ctrl.selection = {
      '01234': true,
      '56789': false
    };
    ctrl.delete();
    expect(deleteSpy.remove).toHaveBeenCalledWith(ctrl.selection);
  });

  it('refreshes the list of todos after deleting', function() {
    spyOn(ctrl, 'list');
    ctrl.delete();
    scope.$apply();
    expect(ctrl.list).toHaveBeenCalled();
  });

  it('delegates marking todos as complete to the complete factory', function() {
    ctrl.selection = {
      '01234': true,
      '56789': false
    };
    ctrl.markComplete();
    expect(completeSpy.mark).toHaveBeenCalledWith(ctrl.selection);
  });

  it('refreshes the list of todos after marking complete', function() {
    spyOn(ctrl, 'list');
    ctrl.markComplete();
    scope.$apply();
    expect(ctrl.list).toHaveBeenCalled();
  });

  it('resets the selection after marking complete', function() {
    ctrl.selection = {
      '01234': true,
      '56789': false
    };
    ctrl.markComplete();
    scope.$apply();
    expect(ctrl.selection).toEqual({});
  })

});
