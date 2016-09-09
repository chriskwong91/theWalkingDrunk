// Will filter out pubs with rating lower than 3

exports.module = (current) => {
	if (current.rating >= 3)
		return true;
	return false;
};