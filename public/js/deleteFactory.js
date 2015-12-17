toDo.factory('Delete', ['$http', function($http) {
  return {
    remove: function(toDo) {
      return $http.post('/delete', toDo);
    }
  }
}])
