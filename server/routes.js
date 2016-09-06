var fs = require('fs');

module.exports = function (app, express) {
  app.route('/')
    .get(function(req, res){
      fs.readFile('./client/index.html', function(err, file){
      	if (err) {
      		res.send(JSON.stringify(err));
      	} else {
      		res.setHeader('Content-Type', 'text/html');
      		res.send(file);
      	}
      })
    });

  app.route('/config/bundle.js')
    .get(function(req, res){
      fs.readFile('./client/public/bundle.js', function(err, file){
        if (err) {
          res.send(JSON.stringify(err));
        } else {
          res.setHeader('Content-Type', 'text/javascript');
          res.send(file);
        }
      })
    })
};