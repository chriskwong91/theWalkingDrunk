//This page builds allows the user to login with passport-facebook

var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../database/database.js').User;
var connection = require('../database/database.js').connection;
var mysql = require('promise-mysql');
//loads facebook or other auth variables
// var configAuth = require('./auth');
var configAuth = require('./env/config.js');


module.exports = function(passport) {

  // serialize user for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
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
    console.log(profile);
    //async process
    process.nextTick(() => {
      //finds if user is in database
      var findUserQuery = `
        select * from dev.user
        where uid = ${mysql.escape(profile.id)};
      `;
      connection.findUserQuery().then(res => {
        if (res) {
          console.log('user exists: ', res);
        } else {
          //create new user
          var newUserQuery = `
            insert into dev.users
            (uid, name, email)
            values
            (${mysql.escape(profile.id)}, ${mysql.escape(name)}, ${mysql.escape(email)});
          `;
          connection.newUserQuery().then(res => {
            console.log('New User added: ', res);
          });
        }
      });


      // User.findOne({ 'facebook.id' : profile.id }, (err, user) => {
      //   if (err) { return done(err); }
      //   // if found, return user
      //     console.log(profile);
      //   if (user) {
      //     console.log(user);
      //     return done(null, user);
      //   } else {
      //     //create new user
      //     var newUser = new User();
      //     newUser.facebook.id = profile.id;
      //     newUser.facebook.token = token;
      //     // newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyname;
      //     newUser.facebook.name = profile.displayName;
      //     newUser.facebook.email = profile.emails[0].value;
      //     newUser.facebook.friends = profile.friends.data;
      //     console.log(newUser);
      //     newUser.save((err) => {
      //       if (err) { throw err; }

      //       return done(null, newUser);
      //     // });
      //   }
      // });
    });
  }));
};
