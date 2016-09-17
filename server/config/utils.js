// utility and helper functions
var request = require('request');
module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('Authenticated!');
      return next();
    }

    console.log('Not Logged ON');
    res.redirect('/#/signup');
  },

  getID: (token) => {
    request('https://graph.facebook.com/me?fields=id&access_token=' + token, (error, res, body) => {
      if (!error) {
          console.log(response);
        }
    });
  }
};
