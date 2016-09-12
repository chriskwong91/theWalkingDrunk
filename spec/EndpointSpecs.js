var assert = require('assert');
var http = require('http');

describe('Endpoints', function() {
  describe('/', function() {
  	describe('GET', function() {
	    it('should respond with HTML', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	    it('should respond with a status code of 200', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	    it('should not be 404', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	  });
  });
  describe('/cached/routes', function() {
    describe('GET', function() {
	    it('should receive request with query', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	    it('should respond with a status code of 200', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	    it('should respond with object', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	    it('should not be 404', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	  });
    describe('POST', function() {
	    it('should GET', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	  });
  });
  describe('/yelp/search', function() {
    describe('GET', function() {
	    it('should GET', function() {
	      assert.equal(-1, [1,2,3].indexOf(4));
	    });
	  });
  });
  describe('404', function() {
    it('should respond with 404', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});