var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('yomp');
});

app.listen('3000', function(){
	console.log('NodeJS + Express server listening at http://localhost:3000');
});
