var utils = require('./utils');
var ToDo = require('mongoose').model('ToDo');
var should = require('should');

describe('model', function () {
 describe('#create()', function () {
   it('should create a new todo', function (done) {
     var t = {task: 'Thing to do'};
     ToDo.create(t, function (err, createdToDo) {
       should.not.exist(err);
       createdToDo.task.should.equal('Thing to do');
       done();
     });
   });
 });

});
