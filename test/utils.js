var config = require('./../config/config');
require('./../app/models/todo.server.model');
var mongoose = require('mongoose');
var ToDo = mongoose.model('ToDo');

exports.clearDB = function(done) {

  function clear(done) {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db, function (err) {
      if (err) {throw err}
      return clear(done);
    });
  } else {return clear(done)}

}

exports.disconnectDB = function(done) {
  mongoose.disconnect();
  return done();
}

exports.seedDB = function(done) {
  var count = 0;
  var numberToSeed = 3;
  for (var i = 0; i < numberToSeed; i++) {
    ToDo.create({
      task: 'Task ' + i
    }, function() {
      count++;
      if(count === numberToSeed) {
        done();
      }
    })
  }
}
