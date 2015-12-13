var request = require('request');
var baseUrl = 'http://localhost:8080';

describe('controller', function() {

  it('returns status code 200', function(done) {
    request.get(baseUrl, function(err, res, body) {
      res.statusCode.should.equal(200);
      done();
    });
  });

});
