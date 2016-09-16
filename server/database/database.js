var mysql = require('promise-mysql');
var config = require('../config/env/config.js');
var connection;


/**
 * @name createConn
 * @desc Given a connection variable, create a connection to our database. 
 * @param {var} conn -
 * @return {undefined}
 */
var createConn = function(conn) {
  mysql.createConnection(config.sql)
    .then(res => {
      connection = res;
    })
    .catch(err => {
      console.log('There was an error with the server, attempting to reconnect in 10 seconds.');
      console.error(err);
      setTimeout(() => createConn(conn), 1000*10);
    });
};

// Create a connection to our server when the server starts.
// For information on escaping using nodesql, refer to:
//   https://github.com/mysqljs/mysql#escaping-query-values
createConn(connection);


/**
 * @name getRoutes
 * @desc Given a string uid representing a userid, return all of the routes the given uid is 
 *   traveling on. 
 * @param {string} uid - A string representing a Facebook uid. 
 * return {Promise<RowDataPacket[]>} Returns a promise that resolved to an array of 
 *   'RowDataPacket'.
 */
var getRoutes = function(uid) {
  var q = `select * from dev.routes where uid = ${mysql.escape(uid)}`;
  
  return connection.query(q);
};


module.exports = {
  connection: connection,
  getRoutes: getRoutes
};

