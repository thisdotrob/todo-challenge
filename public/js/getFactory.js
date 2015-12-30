toDo.factory('Get', ['$http', function($http) {
  return {
    toDos: function() {
      return $http.get('/todos');
    },
    categories: function(toDos) {
      var unique = {}
      var distinct = [];
      for(var i in toDos) {
        if(typeof(unique[toDos[i].category]) === 'undefined') {
          distinct.push(toDos[i].category);
          unique[toDos[i].category] = 0;
        }
      }
      return distinct;
    },
    filteredToDos: function(options) {
      return options.toDos.filter(function(toDo) {
        return toDo.category === options.category;
      });
    }
  };
}])
