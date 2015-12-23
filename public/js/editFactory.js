toDo.factory('Edit', ['$http', function($http) {
  var currentToDo;

  return {
    selectForEditing: function(toDo) {
      this.toDo = toDo;
    },
    editToDo: function(updatedTask) {
      var data = {
        _id: this.toDo._id,
        task: updatedTask
      }
      return $http.post('/edit', data);
    }
  }
}])
