var yelp = require("node-yelp");
var db = require('./database/database.js');
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

	client.search({
	  terms: req.headers.name,
	  location: req.headers.location
    // category_filter: "nightlife"
	})
  .catch((err) => {
    throw err
  })
  .then((obj) => {
    // does not check validity of result
    // relies on accuracy of google.maps.places results
    db.cacheYelpInfo(obj.businesses[0]); 
    res.send(obj.businesses[0]);
  });
};