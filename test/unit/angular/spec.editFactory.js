describe('editFactory', function() {
  var httpBackend;
  var edit;

  var toDo = {
    _id: 12345,
    task: 'Thing to do',
    category: 'A category'
  };

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Edit) {
    httpBackend = $httpBackend;
    edit = Edit;
  }));

  it('selects a todo for editing', function() {
    edit.select(toDo);
    expect(edit.toDo).toEqual(toDo);
  });

  it('edits a todo', function() {
    var data = {
      _id: 12345,
      task: 'Updated thing to do',
      category: 'Updated category'
    };
    edit.select(toDo);
    httpBackend.expectPOST('/edit', data).respond(200);
    edit.save('Updated thing to do', 'Updated category');
    httpBackend.flush();
  });

});
