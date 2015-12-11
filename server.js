var config = require('./config/config');
var express = require('./config/express');
var app = express();
var port = config.port;
var nodeEnv = process.env.NODE_ENV;
app.listen(port);
console.log(nodeEnv + ' server running at http://localhost:' + port);
