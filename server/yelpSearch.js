var yelp = require("node-yelp");
var db = require('./database/database.js');
var fs = require('fs');

var client = yelp.createClient({
  oauth: {
    "consumer_key": "_Qs9S9ohkGj32ygCz0vhyA",
    "consumer_secret": "qA3YVgM_Z31LVHSV9qRLxtriboE",
    "token": "VWLlZeJqo7anSjDjWe4i9N0SwuItniCZ",
    "token_secret": "R21cba_B2dJmoElanqq1Wb1GWAQ"
  },
  
  // Optional settings: 
  httpClient: {
    maxSockets: 25  // ~> Default is 10 
  }
});
 
 
// exports promise
module.exports = (req, res) => {
  // use memoization via prev. cached results
  // ex.
  // if (db.hasEntry(req.headers.bar)){
  //   res.send(db.retrieveEntry(req.headers.bar));
  //   return;
  // }
  // console.log(req.query.name, req.query.location);
	client.search({
	  terms: req.query.name,
	  location: req.query.location + ',USA' 
    // category_filter: "nightlife"
	})
  .catch((err) => {
    res.send(err);
  })
  .then((obj) => {
    // does not check validity of result
    // relies on accuracy of google.maps.places results
    // console.log(obj.businesses[0]);
    if (obj){
      db.cacheYelpInfo(obj.businesses[0]); 
      for (var i = 0; i < obj.businesses.length; i++){
        if(obj.businesses[i].name === req.query.name){
          res.send(obj.businesses[i]);
          console.log('selected ', obj.businesses[i].name, obj.businesses[i].location);
          return;
        }
      }
    res.send(!!obj.businesses ? obj.businesses[0] : 'Try Again');
    }
  });
};