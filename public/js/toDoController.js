toDo.controller('ToDoController', ['Submit', 'List', 'Delete', '$http', function(Submit, List, Delete, $http) {

  var self = this;

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

  self.getToDos();

}]);
