var yelp = require("node-yelp");


/**
 * @name searchYelp
 * @desc Given a request and a result, send the top 20 requests to the user. 
 * @param {Request} req - A request
 * @param {Result} res - A response
 * @return {undefined} There is no defined return type.
 */
var searchYelp = function(req, res) {
  // I'm not sure what parameters the query will have.
  // if (req.query.NAME)
    
  var client = yelp.createClient({
    oauth: {
      'consumer_key': '_Qs9S9ohkGj32ygCz0vhyA',
      'consumer_secret': 'qA3YVgM_Z31LVHSV9qRLxtriboE',
      'token': 'VWLlZeJqo7anSjDjWe4i9N0SwuItniCZ',
      'token_secret': 'R21cba_B2dJmoElanqq1Wb1GWAQ'
    },
  
    // Optional settings: 
    httpClient: {
      maxSockets: 25  // ~> Default is 10 
    }
  });

  client.search({
    limit: 20,
    category_filter: 'bars,nightlife',
    location: '944 Market Street, San Francisco, CA 94102'
  }).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    console.log(`There was en error: ${err}`);
    res.status(400).send('There was an error');
  });
};
 
 
// exports promise
module.exports = searchYelp;

