// utility and helper functions

module.exports = {
  isLoggedIn: (req, res, next) => {
      console.log(req);
      console.log(req.user);
    if (req.isAuthenticated()) {
      console.log('Authenticated!');
      return next();
    }

    console.log('Not Logged ON');
    res.redirect('/');
  },

};
