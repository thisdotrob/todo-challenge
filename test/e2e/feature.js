describe('ToDo app', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has the correct title', function() {
    expect(browser.getTitle()).toEqual('ToDo');
  });

  it('displays an added task', function() {
    var taskStr = 'I need to do this';
    var input = element(by.model('ctrl.draftToDo'));
    var output = element(by.binding('ctrl.submittedToDo'));
    input.sendKeys(taskStr);
    element(by.id('submit-btn')).click();
    expect(output.getText()).toEqual(taskStr)
  })

  it('persists an added task', function() {
    var task = 'A thing to do';
    var input = element(by.model('ctrl.draftToDo'));
    var output = element(by.binding('ctrl.submittedToDo'));
    input.sendKeys(task);
    element(by.id('submit-btn')).click();
    expect(output.getText()).toEqual(task);
    browser.refresh();
    expect(output.getText()).toEqual(task);
  })

});
