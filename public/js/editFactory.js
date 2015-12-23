toDo.factory('Edit', ['$http', function($http) {
  var currentToDo;

  return {
    selectForEditing: function(toDo) {
      currentToDo = toDo;
    },
    toDo: function() {
      return currentToDo;
    },
    editToDo: function(updatedTask) {
      var data = {
        _id: currentToDo._id,
        task: updatedTask
      }
      return $http.post('/edit', data);
    }
  }
}])
