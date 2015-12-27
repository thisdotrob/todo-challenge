toDo.factory('New', ['$http', function($http) {
  return {
    toDo: function(task, category) {
      return $http.post('/new', {task: task, category: category});
    }
  };
}])
