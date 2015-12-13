toDo.controller('ToDoController', ['Submit', '$http', function(Submit, $http) {

  var self = this;

  $http({
    url: '/todos',
    method: 'GET',
  }).then(function(res) {
    self.todos = res.data;
    console.log(self.todos);
  })

  self.addToDo = function() {
    Submit.post(self.draftToDo);
  }

}]);
