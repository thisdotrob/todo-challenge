toDo.factory('Submit', ['$http', function($http) {
  return {
    post: function(task) {
      return $http.post('/', {task: task});
    }
  };
}])
