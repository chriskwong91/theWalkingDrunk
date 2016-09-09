var filterUtils = require('../filterUtils.js');


var filters = {};

// Will filter out pubs with rating lower than 3
filters.rating = filterUtils.transformFilter(require('./ratingFilter.js'));

// Add new filters below here

module.exports = filters;