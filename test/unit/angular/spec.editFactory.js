describe('editFactory', function() {
  var httpBackend;
  var edit;

  var task = {
    _id: '12345',
    task: 'Thing to do'
  };

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Edit) {
    httpBackend = $httpBackend;
    edit = Edit;
  }));

  it('selects a todo for editing', function() {
    edit.selectForEditing(task);
    expect(edit.toDo).toEqual(task);
  });

  it('edits a todo', function() {
    edit.selectForEditing(task);
    httpBackend
      .expectPOST('/edit', '{"_id":"12345","task":"Updated thing to do"}')
      .respond(200,'');
    edit.editToDo('Updated thing to do');
    httpBackend.flush();
  })


});
