describe('ToDoController', function() {

  beforeEach(module('ToDo'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('ToDoController');
  }));

  it('initialises with an empty todo list', function() {
    expect(ctrl.todo).toBeUndefined();
  });

  it('stores a submitted todo', function() {
    var taskStr = 'I need to do this';
    ctrl.draftToDo = taskStr;
    ctrl.addToDo();
    expect(ctrl.submittedToDo).toEqual(taskStr);
  });

});
