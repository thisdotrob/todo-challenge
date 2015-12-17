var ToDo = require('mongoose').model('ToDo');

exports.root = function(req, res) {
  res.render('index');
};

exports.list = function(req, res) {
  ToDo.find({}).exec(function(err, data) {
    if(err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}

exports.create = function(req, res) {
  ToDo.create({task: req.body.task}, function (err, toDo) {
    if(err) {
      res.json(err);
    } else {
      res.json(toDo);
    }
  });
};

exports.remove = function(req, res) {
  ToDo.remove({_id: req.body._id}, function (err) {
    if(err) {
      res.json(err);
    } else {
      ToDo.find({}, function(err, data) {
      })
      res.status(200).json('success');
    }
  })
}
