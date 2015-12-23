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
  ToDo.create({task: req.body.task}, function(err, toDo) {
    if(err) {
      res.json(err);
    } else {
      res.json(toDo);
    }
  });
};

exports.remove = function(req, res) {
  ToDo.remove({_id: req.body._id}, function(err) {
    if(err) {
      res.json(err);
    } else {
      res.status(200).json('success');
    }
  })
}

exports.update = function(req, res) {
  ToDo.update({_id: req.body._id}, { $set: { task: req.body.task }}, cb);
  function cb(err) {
    if(err) {
      res.json(err);
    } else {
      res.sendStatus(200);
    }
  }
}

exports.categorise = function(req, res) {
  ToDo.update({_id: req.body._id}, { $set: { category: req.body.category }}, cb);
  function cb(err) {
    if(err) {
      res.json(err);
    } else {
      res.sendStatus(200);
    }
  }
}
