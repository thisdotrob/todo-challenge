toDo.factory('Delete', ['$http', function($http) {
  return {
    remove: function(selection) {
      return $http.post('/delete', selection);
    }
  }
}])
