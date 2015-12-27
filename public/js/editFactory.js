toDo.factory('Edit', ['$http', function($http) {
  var currentToDo;

  return {
    select: function(toDo) {
      this.toDo = toDo;
    },
    save: function(task, category) {
      var data = {
        _id: this.toDo._id,
        task: task,
        category: category
      }
      return $http.post('/edit', data);
    }
  }
}])
