var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var server = require('gulp-develop-server');
var karmaServer = require('karma').Server;
var mocha = require('gulp-mocha');

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

gulp.task('mocha', function() {
  return gulp.src('./test/unit/node/spec.*.js', {read: false})
    .pipe(mocha());
})

gulp.task('unit', ['karma', 'mocha']);
