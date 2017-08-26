/**
 * Created by gurusrikar on 10/3/16.
 */

var env = require('./env.json');

exports.config = function() {
    var node_env = process.env.NODE_ENV || 'development';
    return env[node_env];
};