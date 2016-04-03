/**
 * Created by truonglee on 19/03/2016.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var pm2 = require('pm2');

var jsFiles = ['/*.js', 'app/**/*.js', 'config/**/*.js'];



gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('server', ['style'], function() {
    pm2.connect(true, function () {
        pm2.start({
            name: 'server',
            script: 'server.js'
        }, function() {
            console.log('pm2 start');
            pm2.streamLogs('all', 0);
        });
    });
});