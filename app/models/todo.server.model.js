var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  task: String
});

mongoose.model('ToDo', toDoSchema);
