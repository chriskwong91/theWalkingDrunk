var mocha = require('mocha');
var chai = require('chai');

const testData = {}
  valid1: {name: 'foo', address: '123 Foo Street', latitude: 1.2, longitude: 3.4, rating: 1, price: 2, tags: ['irish']},  //Valid test data
  valid2: {name: 'bar', address: '111 Foo Street', latitude: 5.6, longitude: 7.8, rating: 1, price: 4, tags: []},  //Valid test data
  valid3: {name: 'baz', address: '333 Baz Street', latitude: 9, longitude: 10, rating: 3, price: 2, tags: ['loud', 'big']},  //Valid test data
  incomplete: {name: "foo", address: '123 Foo Street', latitude: 11.2}, //Incomplete test data
  invalid: {name: "foo", address: 123, latitude: 'foo', longitude: 55.6, rating: , price: 2, tags: []}  //Invalid test data
  outOfRange1: {name: 'foo', address: '123 Foo Street', latitude: 1.2, longitude: 3.4, rating: 1, price: 0, tags: []},  //Out of range test data (price)
  outOfRange2: {name: 'foo', address: '123 Foo Street', latitude: 1.2, longitude: 3.4, rating: 6, price: 2, tags: []},  //Out of range test data (rating)
]}

//Test addStop()
  //Test adding docs
  //Test adding duplicate docs
  //Test adding docs with incomplete data
  //Test adding docs with invalid data
  //Test adding docs with data which is out of range
//Test findOneStop() and findStops()
  //Test finding docs that do exist
  //Test finding docs that do not exist
  //Test finding docs when none exist
//Test updateStops()
  //Test updating docs
  //Test updating docs to create duplicates
  //Test updating docs that don't exist
//Test removing docs
  //Test removing docs
  //Test re-adding removed docs
  //Test removing docs that don't exist
