var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var server = require('gulp-develop-server');
var karmaServer = require('karma').Server;
var jasmineNode = require('gulp-jasmine-node');

gulp.task('e2e', function() {
  server.listen( { path: './server.js' } );
  gulp.src(["./test/e2e/feature.js"])
      .pipe(protractor({
        configFile: "test/e2e/conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8080']
      }))
      .on('error', function(e) { throw e })
})

gulp.task('karma', function() {
  new karmaServer({
    configFile: __dirname + '/test/unit/angular/karma-conf.js',
    singleRun: true
  }).start();
});

gulp.task('jasmine-node', function () {
    return gulp.src(['test/unit/node/spec.*.js']).pipe(jasmineNode({
        timeout: 10000
    }));
});

gulp.task('unit', ['karma','jasmine-node'])
