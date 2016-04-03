/**
 * Created by truonglee on 19/03/2016.
 */
/**
 *Module dependencies
 */

var path = require('path');
var extend = require('util')._extend;


var development = require('./env/development');
var production = require('./env/production');
var test = require('./env/test');

var defaults = {
    root: path.normalize(__dirname + '/..')
};

/**
 *Expose
 **/

module.exports = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];