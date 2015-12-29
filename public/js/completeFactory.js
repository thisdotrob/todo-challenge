toDo.factory('Complete', ['$http', function($http) {
  return {
    mark: function(selection) {
      return $http.post('/complete', selection);
    }
  }
}])
