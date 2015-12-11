describe('ToDo app', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has the correct title', function() {
    expect(browser.getTitle()).toEqual('ToDo');
  });

  it('has a task input field', function() {
    var inputField = element(by.id('input'));
    expect(inputField.isPresent()).toBe(true);
  });

});
