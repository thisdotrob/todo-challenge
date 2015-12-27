var ToDo = require('mongoose').model('ToDo');

exports.root = function(req, res) {
  res.render('index');
};

exports.todos = function(req, res) {
  ToDo.find({}).exec(function(err, data) {
    if(err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}

exports.new = function(req, res) {
  var task = req.body.task;
  var category = req.body.category;
  ToDo.create({task: task, category: category}, function(err, toDo) {
    if(err) {
      res.json(err);
    } else {
      res.json(toDo);
    }
  });
};

exports.edit = function(req, res) {
  var _id = req.body._id;
  var task = req.body.task;
  var category = req.body.category;

  ToDo.update({_id: _id}, { $set: { task: task, category: category }}, cb);

  function cb(err) {
    if(err) {
      res.json(err);
    } else {
      res.sendStatus(200);
    }
  }
}

exports.delete = function(req, res) {
  ToDo.remove({_id: req.body._id}, function(err) {
    if(err) {
      res.json(err);
    } else {
      res.status(200).json('success');
    }
  })
}
