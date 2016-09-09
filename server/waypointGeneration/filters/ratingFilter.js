// Will filter out pubs with rating lower than 3

module.exports = (current) => {
	if (current.rating >= 4.5)
		return true;
	return false;
};