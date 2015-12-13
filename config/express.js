var express = require('express');

module.exports = function() {
  var app = express();
  app.use(express.static('./public'));
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  require('../app/controllers/index.server.controller.js')(app);
  return app;
}
