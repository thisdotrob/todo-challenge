var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  task: String
});

module.exports = mongoose.model('ToDo', toDoSchema);
