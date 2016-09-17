//This page builds allows the user to login with passport-facebook

var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../database/database.js').User;

var database = require('../database/database.js');
//loads facebook or other auth variables
// var configAuth = require('./auth');
var configAuth = require('./env/config.js');


module.exports = function(passport) {

  // serialize user for session
  passport.serializeUser(function(user, done) {
    done(null, user.facebook.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    database.findUser(id, function(err, user) {
        done(err, user);
    });
  });

  //*************************************************
  // Facebook Login ***********************************
  //*************************************************

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    scope: ['user_friends'],
    profileFields: ['id', 'displayName', 'email', 'friends']
  },
  // this is what Facebook sends back
  (token, refreshToken, profile, done) => {
    console.log('friends: ', profile._json.friends.data, typeof profile._json.friends.data);
    //async process
    process.nextTick(() => {
      //finds if user is in database
      database.addUser(profile, token, done);

    });
  }));
};
