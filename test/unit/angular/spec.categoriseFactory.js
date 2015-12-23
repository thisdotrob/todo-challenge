describe('categoriseFactory', function() {
  var categorise;
  var httpBackend;

  var task = {
    _id: '12345',
    task: 'Thing to do'
  };

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Categorise) {
    httpBackend = $httpBackend;
    categorise = Categorise;
  }));

  it('selects a todo for categorising', function() {
    categorise.selectForCategorising(task);
    expect(categorise.toDo).toEqual(task);
  });

  it('categorises a todo', function() {
    categorise.selectForCategorising(task);
    httpBackend
      .expectPOST('/category', '{"_id":"12345","category":"Category0"}')
      .respond(200,'');
    categorise.addCategory('Category0');
    httpBackend.flush();
  });

})
