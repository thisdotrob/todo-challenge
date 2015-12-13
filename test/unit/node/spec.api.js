var request = require('request');
var baseUrl = 'http://localhost:8080';
var ToDoMock = require('./model-mock');

describe('controller', function() {

  var seedToDosCount = 10;
  var testToDo;
  var toDoModelMock;

  beforeEach(function(done) {
    toDoModelMock = new ToDoMock();
    done()
  })

  it('returns status code 200', function(done) {
    request.get(baseUrl, function(err, res, body) {
      res.statusCode.should.equal(200);
      done();
    });
  });

});
