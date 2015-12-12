describe('ToDo app', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has the correct title', function() {
    expect(browser.getTitle()).toEqual('ToDo');
  });

  it('has a task input field', function() {
    var inputField = element(by.model('ctrl.draftToDo'));
    expect(inputField.isPresent()).toBe(true);
  });

  it('displays an added task', function() {
    var taskStr = 'I need to do this';
    var input = element(by.model('ctrl.draftToDo'));
    var output = element(by.binding('ctrl.submittedToDo'));
    input.sendKeys(taskStr);
    element(by.id('submit-btn')).click();
    expect(output.getText()).toEqual(taskStr)
  })

});
