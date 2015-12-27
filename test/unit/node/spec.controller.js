var request = require('request-json');
var utils = require('./../../utils');
var ToDo = require('mongoose').model('ToDo');
var should = require('should');
var client = request.createClient('http://localhost:8080');

beforeEach(function (done) {utils.clearDB(done)});
afterEach(function (done) {utils.disconnectDB(done)});

describe('controller', function() {

  it('responds to root', function(done) {
    client.get('/', function(err, res, body) {
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('returns a list of stored todos', function(done) {
    var tasks = ['task1','task2','task3'];
    var callbackCount = 0;
    var callback = function() {
      callbackCount++;
      if(callbackCount === tasks.length) {
        client.get('/todos', function(err, res, body) {
          var returnedTasks = body.map(function(todo) {
            return todo.task;
          }).sort();
          res.statusCode.should.equal(200);
          should.not.exist(err);
          returnedTasks.should.eql(tasks);
          done();
        })
      }
    }
    for (var i = tasks.length; i > 0; i--) {
        ToDo.create({task: tasks[i-1], category: 'A category'}, callback);
    }
  });

  it('submits a new todo', function(done) {
    var data = {
      task: 'A thing to do',
      category: 'A category'
    };
    client.post('/new', data, function(err, res, body) {
      res.statusCode.should.equal(200);
      should.not.exist(err);
      body.task.should.equal(data.task);
      body.category.should.equal(data.category);
      should.exist(body._id);
      done();
    });
  });

  it('deletes a todo', function(done) {
    ToDo.create({task: 'task0', category: 'category0'}, cb);
    function cb(err, createdToDo) {
      client.post('/delete', createdToDo, function(err, res, body) {
        res.statusCode.should.equal(200);
        ToDo.count({}, function(err, count) {
          count.should.equal(0);
          done();
        });
      });
    }
  });

  it('edits a todo', function(done) {
    ToDo.create({task: 'task0', category: 'category0'}, cb);
    function cb(err, createdToDo) {
      var data = {
        _id: createdToDo.id,
        task: 'updated task',
        category: 'updated category'
      }
      client.post('/edit', data, function(err, res, body) {
        res.statusCode.should.equal(200);
        ToDo.findById(data._id, function(err, found) {
          found.task.should.eql(data.task);
          found.category.should.eql(data.category);
          done();
        })
      })
    }
  });

});
