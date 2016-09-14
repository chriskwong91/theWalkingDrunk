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
  app.use(utils.isLoggedIn);

  //facebook route

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });

  app.route('/cached/routes')
    .get(function(req, res){
      console.log('GET - /cached/routes');
      db.retrievePubRoutes(req, res);
    })
    .post(function(req, res){
      console.log('POST - /cached/routes');
      db.cachePubRoutes(req, res);
    });

  app.route('/yelp/search')
    .get(function(req, res){
      console.log('GET - /yelp/search');

      // replace with memoization feature
      yelpSearch(req, res);
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
