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

/**
 * @name findUser
 * @desc Finds a particular user information
 * @param {string} uid - A string representing a Facebook uid.
 * return {object} Returns User data
 */
var findUser = (id, callback) => {
  var findUserQuery = `
    select * from dev.users
    where uid = ${mysql.escape(id)};
  `;
  connection.query(findUserQuery, (err, res) => {
    if (callback) {
      callback(err, res[0]);
    }
  });
}

var grabFriends = (id, callback) => {
  var getFriendsQuery = `

  `;
};
/**
 * @name addFriend
 * @desc Adds two users as friends
 * @param {string, string} uid1, uid2 - two Facebook user id's
 * return {undefined}
 */
var addFriend = (id, friendid) => {
  var newFriendQuery = `
    insert into dev.friends
    (uid1, uid2)
    values
    (${mysql.escape(id)}, ${mysql.escape(id)});
  `
  connection.query(newFriendQuery);
};

/**
 * @name addUser
 * @desc Checks to see if user is in database, if exist, call done and finish authenticating
 *  if user doesn't exist, create new user and authenticate
 * @param {profile, token, done} - profile has Facebook user information. Token is facebook token
 * return {done} Sends params to the done request to finish authenticating
 */
var addUser = (profile, token, done) => {
  findUser(profile.id, (err, res) => {
    if (err) { console.log('Error!: ', err); }

    // Check if User is in Database
    if (res) {
      console.log('user exists: ', res);
      return done(null, {facebook: res});
    } else {

      //Create New User
      var newUserQuery = `
        insert into dev.users
        (uid, id, name, email, token)
        values
        (${mysql.escape(profile.id)}, ${mysql.escape(profile.id)},
         ${mysql.escape(profile.displayName)}, ${mysql.escape(profile.emails[0].value)},
         ${mysql.escape(token)});
      `;
      connection.query(newUserQuery);

      //Add friends to database
      profile._json.friends.data.forEach((friend) => {
        addFriend(profile.id, friend.id);
      });

      // Send New User data back to Facebook Strategy
      findUser(profile.id, (err, res) => {
        if (err) { console.log('Error!: ', err); }
        return done(null, {facebook: res});
      });
    }
  });
};

module.exports = {
  findUser: findUser,
  addUser: addUser,
  createConn: createConn,
  connection: connection,
  getRoutes: getRoutes,
  addRoute: addRoute,
  removeRoutes: removeRoutes
};

