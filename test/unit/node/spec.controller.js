var request = require('request-json');
var utils = require('./utils');
var should = require('should');
var client = request.createClient('http://localhost:8080');

describe('controller', function() {

  it('responds to root', function(done) {
    client.get('/', function(err, res, body) {
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('submits a new todo', function(done) {
    var task = 'A thing to do';
    client.post('/new', {task: task}, function(err, res, body) {
      res.statusCode.should.equal(200);
      should.not.exist(err);
      body.task.should.equal(task);
      done();
    });
  });

});
