var ToDoMock = function() {
  this.todos = [];
  this.err = false;
  this.seedToDosCount = 5;
  this.ToDo = require('../../../app/models/todo.server.model');
  this.numberAffected = 0;
};

ToDoMock.prototype.setError = function(err) {
  this.err = err;
};

ToDoMock.prototype.setNumberAffected = function(number) {
  this.numberAffected = number;
};

ToDoMock.prototype.seedToDos = function() {
  for (var i = 0; i < this.seedToDosCount; i++) {
    var todo = new this.ToDo({task: 'task ' + i});
    this.todos.push(todo);
  }
};

ToDoMock.prototype.getTestToDo = function() {
  return this.todos ? this.todos[0] : null;
};

ToDoMock.prototype.findById = function(id, callback) {
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i]._id === id) {
      return callback(this.err, this.todos[i]);
    }
  }
  return callback(this.err, null);
};

ToDoMock.prototype.findOne = function(where, callback) {
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i].task === where.task) {
      return callback(this.err, this.todos[i]);
    }
  }
  return callback(this.err, null);
};

ToDoMock.prototype.save = function(callback) {
  return callback(this.err, this, this.numberAffected);
};

ToDoMock.prototype.update = function(conditions, update, callback) {
  return callback(this.err, this.numberAffected);
}

module.exports = ToDoMock;
