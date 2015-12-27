toDo.controller('ToDoController', ['Submit', 'List', 'Delete', 'Edit', 'Categorise', '$http', function(Submit, List, Delete, Edit, Categorise, $http) {

  var self = this;

  self.addToDo = function() {
    Submit.new(self.draftToDo).then(self.getToDos);
  };

  self.getToDos = function() {
    List.toDos().then(function(res) {
      self.toDos = res.data;
    });
  };

  self.deleteToDo = function(toDo) {
    Delete.remove(toDo).then(self.getToDos);
  }

  self.showEditPanel = function(toDo) {
    self.editing = true;
    Edit.selectForEditing(toDo);
  }

  self.editToDo = function() {
    self.editing = false;
    Edit.editToDo(self.editedTask).then(self.getToDos);
  }

  self.showCategorisePanel = function(toDo) {
    self.categorising = true;
    Categorise.selectForCategorising(toDo);
  }

  self.categoriseToDo = function() {
    self.categorising = false;
    Categorise.addCategory(self.category).then(self.getToDos);
  }

  self.init = function() {
    self.editing = false;
    self.categorising = false;
    self.getToDos();
  }

  self.init();

}]);
