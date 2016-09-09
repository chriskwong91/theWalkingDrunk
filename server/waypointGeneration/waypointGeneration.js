var yelpSearch = require('./yelpSearch.js');

var filters = require('./filters/filters.js');

module.exports = (req, res) => {
	yelpSearch(req.query.location)
		.then((data) =>
			filters.rating(data.businesses)
		)
		.then((data) =>
			res.send(data)
		);
};