var yelp = require("node-yelp");
var config = require('./config/env/config.js');
var _ = require('underbar');


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
  var query = _.extend(req.query, {
    limit: 20,
    category_filter: 'bars,nightlife'
  });
  
  console.log('There was a Yelp search with the following query:');
  console.log(query);
    
  var client = yelp.createClient({
    oauth: {
      'consumer_key': config.oauth.consumer_key,
      'consumer_secret': config.oauth.consumer_secret,
      'token': config.oauth.token, 
      'token_secret': config.oauth.token_secret 
    },
  
    // Optional settings: 
    httpClient: {
      maxSockets: 25  // ~> Default is 10 
    }
  });

  client.search(query).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    console.log(err);
    res.status(400).send('There was an error');
  });
};
 
 
// exports promise
module.exports = searchYelp;

