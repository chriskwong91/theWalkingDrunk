var yelpSearch = require('./yelpSearch.js');
var filterUtils = require('./filterUtils.js');
var ratingFilter = require('./ratingFilter.js');
ratingFilter = filterUtils.transformFilter(ratingFilter.module);

module.exports = (req, res) => {
	yelpSearch(req.query.location)
		.then((data) => {
			return ratingFilter(data.businesses);
		})
		.then((data) => {
			res.send(data);
		});
};