toDo.controller('ToDoController', ['Submit', function(Submit) {

  var self = this;

  self.addToDo = function() {
    Submit.post(self.draftToDo);
  }

}]);
