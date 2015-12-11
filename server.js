var config = require('./config/config');
var express = require('./config/express');
var app = express();
app.listen(config.port);
