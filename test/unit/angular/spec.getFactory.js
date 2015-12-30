describe('getFactory', function() {
  var httpBackend;
  var get;

  beforeEach(module('ToDo'));

  beforeEach(inject(function($httpBackend, Get) {
    httpBackend = $httpBackend;
    get = Get;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

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

  it('retrieves the list of todos', function() {
    httpBackend.expectGET('/todos').respond(200);
    get.toDos();
    httpBackend.flush();
  });

  it('returns the unique list of categories', function() {
    expect(get.categories(sampleToDos)).toEqual(categories);
  });

  it('returns a filtered list of todos', function() {
    var options = {
      toDos: sampleToDos,
      category: 'category1'
    }
    expect(get.filteredToDos(options)).toEqual(filteredToDos);
  });

});
