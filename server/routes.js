var fs = require('fs');
var yelpSearch = require('./yelpSearch.js');
var db = require('./database/database.js');
var bodyParser = require('body-parser');
var utils = require('./config/utils.js');
var passport = require('passport');


module.exports = function (app, express) {

  app.use(express.static(__dirname + '/../client'));
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'email']}));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/login'
    }));
  // app.use(utils.isLoggedIn);

  //facebook route

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });

  app.get('/api/search', yelpSearch);

  app.route('/api/routes/:uid/:location?')
    .all((req, res) => {
      var location = req.params.location;
      var uid = req.params.uid;
      console.log(location);
      console.log(uid);
    })
    .get((req, res) => {
      console.log('hi');
      res.status(200).send('hi');
    });

  // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/login');
  });
  app.use(function(req, res){
    res.status(404);

    if (req.accepts('html')) {
      // respond with html page
      res.send('404 - Not found');
      return;
    } else if (req.accepts('json')) {
      // respond with json
      res.send({ error: '404 - Not found' });
      return;
    }
    // default to plain-text. send()
    res.type('txt').send('404 - Not found');
  });
};

