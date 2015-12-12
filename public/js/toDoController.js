toDo.controller('ToDoController', [function() {

  var self = this;

  self.addToDo = function() {
    self.submittedToDo = self.draftToDo;
  }

}]);
