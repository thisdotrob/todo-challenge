describe('ToDo app', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('should have the correct page title', function() {
    expect(browser.getTitle()).toEqual('ToDo');
  });

})
