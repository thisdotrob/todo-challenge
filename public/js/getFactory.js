toDo.factory('Get', ['$http', function($http) {
  return {
    toDos: function() {
      return $http.get('/todos');
    }
  };
}])
