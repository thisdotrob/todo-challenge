var config = require('./config/config');
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();

var port = config.port;
var dbname = config.db;
var nodeEnv = process.env.NODE_ENV;

app.listen(port);

console.log(nodeEnv + ' server running at http://localhost:' + port);
console.log(nodeEnv + ' database connected at ' + dbname);
