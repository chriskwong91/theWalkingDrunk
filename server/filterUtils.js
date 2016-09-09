//These 

//These decorator functions take a callback and transform function.
//When the transform function is passed an array of data it returns a promise
//that calls the callback with each element of the array.  Each decorator
//uses a different  that handles the data in a different manner (i.e. map, reduce, etc.).
var transformers = {};

transformers.transformMap = (callback) => {
  return (data) => {
    transformers.promiseArray = data.map((current) =>
      new Promise((resolve, reject) => resolve(callback(current)))
    );

    return Promise.all(promiseArray);
  };
};

transformers.transformEach = (callback) => {
  return (data) => 
    new Promise((resolve, reject) => 
      resolve(data.forEach((current) => 
        callback(current))));
};

transformers.transformReduce = (callback) => {
  return (data) => {
    new Promise((resolve, reject) => {
      resolve(data.reduce((accumulator, current) => {return callback(current)}));
    });
  };
};

transformers.transformFilter = (callback) => {
  return (data) => {
    return new Promise((resolve, reject) => {
      resolve(data.filter((current) => callback(current)));
    });
  };
};

module.exports = transformers;