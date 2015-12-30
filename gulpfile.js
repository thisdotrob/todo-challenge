var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var server = require('gulp-develop-server');
var karmaServer = require('karma').Server;
var mocha = require('gulp-mocha');

gulp.task('listen', ['set-env'], function(done) {
  var opts = {
    path: './server.js',
    env: {NODE_ENV: 'test'}
  };
  server.listen(opts , function(err) {
    done(err);
  });
})

gulp.task('feature-test', ['listen'], function() {
  gulp.src(["./test/e2e/feature.js"])
      .pipe(protractor({
        configFile: "test/e2e/conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8080']
      }))
      .on('error', function(e) { throw e })
      .once('end', function() {
        server.kill();
      })
});

gulp.task('node-test', ['listen'], function() {
  gulp.src(['./test/unit/node/spec.*.js'], {read: false})
    .pipe(mocha())
    .once('end', function() {
      server.kill();
    });
});

gulp.task('angular-test', function() {
  new karmaServer({
    configFile: __dirname + '/test/unit/angular/karma-conf.js',
    singleRun: true
  }).start();
});

gulp.task('set-env', function() {
  process.env.NODE_ENV = 'test';
});
