/**
 * Created by truonglee on 18/03/2016.
 */
/**
*Modules dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');

var app = express();
var port = process.env.PORT || 3000;

//connect to mongodb
var connect = function() {
    var options = { server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.once('open', function() {
    console.log('connect to mongodb');
});

//Bootstrap models

fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
    if(~file.indexOf('.js')) {
        require(__dirname + '/app/models/' + file);
    }
});

//Bootstrap passport config
require('./config/passport')(passport, config);

//Bootstrap application config
require('./config/express')(app, passport);

//Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Express app start on port' + port);