toDo.factory('Categorise', ['$http', function($http) {

  return {
    selectForCategorising: function(toDo) {
      this.toDo = toDo;
    },
    addCategory: function(category) {
      var data = {
        _id: this.toDo._id,
        category: category
      }
      return $http.post('/category', data);
    }

  }
}])
