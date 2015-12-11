var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var server = require('gulp-develop-server');

gulp.task('connect', function() {
  server.listen( { path: './server.js' } );
});

gulp.task('protractor', function() {
  gulp.src(["./test/e2e/feature.js"])
      .pipe(protractor({
        configFile: "test/e2e/conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8080']
      }))
      .on('error', function(e) { throw e })
})

gulp.task('e2e', ['connect', 'protractor'])