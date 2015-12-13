module.exports = function(config) {
  config.set({
    basePath: '../../../',
    frameworks: ['jasmine'],
    files: [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/js/**/*.js',
      'test/unit/angular/spec.*.js'
    ],
    reporters: ['progress'],
    port: 8080,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
