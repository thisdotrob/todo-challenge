var request = require('request');

describe('GET /', function() {
  it('returns status code 200', function(done) {
    request.get('http://localhost:8080', function(err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});
