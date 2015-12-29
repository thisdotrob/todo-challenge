var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  task: String,
  category: String,
  complete: Boolean
});

module.exports = mongoose.model('ToDo', toDoSchema);
