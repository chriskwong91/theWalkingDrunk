var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); //reads cookies for auth

// parse application/json
app.use(bodyParser.json());

require('./routes.js')(app, express);

//passport requirements
app.use(session({ secret: 'iloveyelpcrawl' }));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sess

app.listen('3000', function(){
	console.log('NodeJS + Express server listening at http://localhost:3000');
});
