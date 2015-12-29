toDo.controller('ToDoController', ['New', 'Get', 'Delete', 'Edit', 'Complete', '$http', function(New, Get, Delete, Edit, Complete, $http) {

  var self = this;

  self.init = function() {
    self.editing = false;
    self.creating = false;
    self.list();
  }

  self.list = function() {
    Get.toDos().then(function(res) {
      self.toDos = res.data;
    });
  };

  self.new = function() {
    self.creating = true;
  }

  self.edit = function(toDo) {
    Edit.select(toDo);
    self.editedTask = toDo.task;
    self.editedCategory = toDo.category;
    self.editing = true;
  }

  self.add = function() {
    New.toDo(self.task, self.category).then(function() {
      self.creating = false;
      self.task = null;
      self.category = null;
      self.list();
    });
  };

  self.save = function() {
    self.editing = false;
    Edit.save(self.editedTask, self.editedCategory).then(self.list);
  }

  self.delete = function() {
    Delete.remove(self.selection).then(self.list);
  }

  self.markComplete = function() {
    Complete.mark(self.selection).then(function() {
      self.selection = {};
      self.list();
    });
  }

  self.init();

}]);
