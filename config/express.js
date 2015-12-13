var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
  var app = express();
  app.use(express.static('./public'));
  app.use(bodyParser.json());
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  require('../app/routes/index.server.routes.js')(app);
  return app;
}
