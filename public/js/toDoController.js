toDo.controller('ToDoController', ['Submit', 'List', '$http', function(Submit, List, $http) {

  var self = this;

  self.addToDo = function() {
    console.log('draftToDo: ' + self.draftToDo);
    Submit.new(self.draftToDo);
    self.getToDos();
  };

  self.getToDos = function() {
    List.toDos().then(function(res) {
      self.toDos = res.data;
    });
  };

  self.getToDos();

}]);
