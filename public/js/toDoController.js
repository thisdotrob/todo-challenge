toDo.controller('ToDoController', ['Submit', 'List', 'Delete', 'Edit', '$http', function(Submit, List, Delete, Edit, $http) {

  var self = this;
  var editing = false;

  self.addToDo = function() {
    Submit.new(self.draftToDo);
    self.getToDos();
  };

  self.getToDos = function() {
    List.toDos().then(function(res) {
      self.toDos = res.data;
    });
  };

  self.deleteToDo = function(toDo) {
    Delete.remove(toDo);
    self.getToDos();
  }

  self.showEditField = function(toDo) {
    Edit.selectForEditing(toDo);
    self.editing = true;
  }

  self.editToDo = function() {
    Edit.editToDo(self.editedTask);
    self.editing = false;
    self.getToDos();
  }

  self.getToDos();

}]);
