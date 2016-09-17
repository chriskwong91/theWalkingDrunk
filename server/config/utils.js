// utility and helper functions

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('Authenticated!');
      return next();
    }

    console.log('Not Logged ON');
    res.redirect('/signup');
  },

};
