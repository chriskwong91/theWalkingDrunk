var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

require('./routes.js')(app, express);

app.listen('3000', function(){
	console.log('NodeJS + Express server listening at http://localhost:3000');
});
