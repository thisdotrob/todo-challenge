# ToDo challenge

My solution to the seventh Makers Academy weekend challenge. The task was to build a simple todo app using our choice of technologies. I opted to implement the [MEAN](http://mean.io/˜) stack,  and used [Gulp](http://gulpjs.com/) to automate testing with [Protractor](https://angular.github.io/protractor/#/), [Mocha](https://mochajs.org/) and [Karma](https://github.com/karma-runner/karma).

![screenshot](http://i.imgur.com/A5KDeBP.png)

## Setup
Install the following: [MongoDB](https://docs.mongodb.org/manual/installation/), [Node](https://nodejs.org/en/) & [Bower](http://bower.io/)

Then:

0. ```git clone git@github.com:thisdotrob/todo_challenge.git```
0. ```npm install```
0. ```bower install```
0. ```mongod```

## To use
0. create environment variable: `export NODE_ENV=development`
0. ```node server.js```
0. visit ```http://localhost:8080```

## To run tests
0. create environment variable: `export NODE_ENV=test`
0. `./node_modules/protractor/bin/webdriver-manager update`
0. `./node_modules/gulp/bin/gulp.js feature-test` for protractor feature tests.
0. `./node_modules/gulp/bin/gulp.js angular-test` for angular unit tests.
0. `./node_modules/gulp/bin/gulp.js node-test` for node/express/mongo unit tests.
