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
  var q = `select * from dev.routes where uid = ${mysql.escape(uid)};`;

  return connection.query(q);
};

/**
 * @name removeRoutes
 * @desc Given a string uid, an optional number routeNumber, and an optional string location,
 *   remove the bars matching the latter two paramters from the routes.
 * @param {string} uid - A string representing a Facebook uid.
 * @param {number} [routeNumber] - An optional number.
 * @param {string} [location] - An optional location.
 * @return {undefined} There is no defined return type.
 */
var removeRoutes = function(uid, routeNumber, location) {
  var q = `delete from dev.routes where uid = ${mysql.escape(uid)}`;
  if (routeNumber !== undefined) {
    q += ` and route_number = ${mysql.escape(routeNumber)}`;
  }
  if (location !== undefined) {
    q += ` and location = ${mysql.escape(location)}`;
  }

  connection.query(q += ';');
};

/**
 * @name addRoute
 * @desc Given a string uid and a string location, add the string/location tuple to the db.
 * @param {string} uid - A Facebook user id.
 * @param {string} location - A Yelp bar location.
 * @return {undefined} There is no defined return type.
 */
var addRoute = function(uid, location) {
  connection.query(`
    select route_number
    from dev.routes
    where uid = ${mysql.escape(uid)}
    order by route_number desc
    limit 1;
  `).then(res => {
    var q = `
      insert into dev.routes
      (uid, route_number, location)
      values
      (${mysql.escape(uid)}, ${res[0] === undefined ? 1 : res[0].route_number + 1}, ${mysql.escape(location)});
      `;
    connection.query(q);
  });
};


module.exports = {
  createConn: createConn,
  connection: connection,
  getRoutes: getRoutes,
  addRoute: addRoute,
  removeRoutes: removeRoutes
};

