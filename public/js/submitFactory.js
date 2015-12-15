toDo.factory('Submit', ['$http', function($http) {
  return {
    new: function(task) {
      return $http.post('/new', {task: task});
    }
  };
}])
