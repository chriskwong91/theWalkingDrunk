//These decorator functions take a callback and transform function.
//When the transform function is passed an array of data it returns a promise
//that calls the callback with each element of the array.  Each decorator
//uses a different  that handles the data in a different manner (i.e. map, reduce, etc.).

const transformMap = (callback) => {
  return (data) => {
    const promiseArray = data.map((current) => {
        new Promise((resolve, reject) => resolve(callback(current)));
    };

    return Promise.all(promiseArray);
  };
};

const transformEach = (callback) => {
  return (data) => {
    new Promise((resolve, reject) => {
      data.forEach((current) => callback(current));
      resolve(data);
    });
  };
};

const transformReduce = (callback) => {
  return (data) => {
    new Promise((resolve, reject) => {
      data.reduce((accumulator, current) => {return callback(current)});
    });
  };
};

const transformFilter = (callback) => {
  return (data) => {
    new Promise((resolve, reject) => {
      data.filter((current) => callback(current));
    });
  };
};
