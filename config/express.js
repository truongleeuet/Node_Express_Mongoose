/**
 * Created by truonglee on 19/03/2016.
 */
/**
 * Module dependencies
 */


var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var helpers = require('view-helpers');
var config = require('config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 *Expose
 */

module.exports = function(app, passport) {
    //Compression middleware (should be place before express.static)

    app.use(compression({
        threshold: 512
    }));

    //Static file middleware
    app.use(express.static(config.root + '/public'));

    //Use winston on production
    var log;
    if (env !== 'development') {
        log = {
            stream: {
                write: function(message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = 'dev';
    }

    //Don't log during tests
    //Logging middleware
    if (env !== 'test') app.use(morgan(log));

    //Set view path and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');

    //expose package.json to views
    app.use(function(req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    //bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride(function(req, res) {
        if(req.body && typeof req.body === 'object' && '_method' in req.body) {
            //look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    //cookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({secret: 'secret'}));
    app.use(session({
        secret: pkg.name,
        proxy: true,
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({
            url: config.db,
            collection: 'session'
        })
    }));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    //connect flash for flash message - should be declared after session
    app.use(flash());

    //should be declared after session and flash
    app.use(helpers(pkg.name));

    //add CSRF support
    if (process.env.NODE_ENV !== 'test') {
        app.use(csrf());

        //This could be moved to view-helpers :-)
        app.use(function(req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }
};