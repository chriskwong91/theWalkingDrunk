var express = require('express');
var app = express();

require('./routes.js')(app, express);

app.listen('3000', function(){
	console.log('NodeJS + Express server listening at http://localhost:3000');
});
