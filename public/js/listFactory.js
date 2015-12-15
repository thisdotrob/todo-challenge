toDo.factory('List', ['$http', function($http) {
  return {
    toDos: function() {
      return $http.get('/list');
    }
  };
}])
