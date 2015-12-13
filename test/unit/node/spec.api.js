var request = require('request');
var baseUrl = 'http://localhost:8080';

describe('GET /', function() {

  it('returns status code 200', function(done) {
    request.get(baseUrl, function(err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
  
});
