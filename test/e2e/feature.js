var utils = require('./../utils');
var ToDo = require('mongoose').model('ToDo');

describe('ToDo app', function() {

  it('has the correct title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('ToDo');
  });

  it('does not display the edit or new dialogues', function() {
    browser.get('http://localhost:8080');
    var editDialogue = element(by.id('edit-dialogue'));
    var newDialogue = element(by.id('new-dialogue'));
    expect(editDialogue.isDisplayed()).toBeFalsy();
    expect(newDialogue.isDisplayed()).toBeFalsy();
  })

  describe('No ToDo\'s in the database', function() {

    beforeEach(function (done) {utils.clearDB(done)});
    afterEach(function (done) {utils.disconnectDB(done)});

    it('can add a task', function(done) {
      var task = 'I need to do this';
      var category = 'Some category';
      browser.get('http://localhost:8080');
      element(by.css('.new-btn')).click().then(function() {
        element(by.model('ctrl.task')).sendKeys(task);
        element(by.model('ctrl.category')).sendKeys(category);
        element(by.css('.add-btn')).click().then(function() {
          element(by.css('.task')).getText().then(function(text) {
            expect(text).toEqual(task);
            element(by.css('.category')).getText().then(function(text2) {
              expect(text2).toEqual(category);
              done();
            })
          });
        })
      })
    });
  });

  describe('Pre-existing ToDo\'s in the database', function() {

    beforeEach(function (done) {
      utils.clearDB(function() {
        utils.seedDB(function() {
          done();
        });
      });
    });

    afterEach(function (done) {
      utils.disconnectDB(done);
    });

    it('displays pre-entered tasks on page load', function(done) {
      browser.get('http://localhost:8080');
      var elements = element.all(by.repeater('toDo in ctrl.toDos'));
      elements.count().then(function(count) {
        var resultsPushed = 0;
        var results = [];
        for(var i = 0; i < count; i++) {
          elements.get(i).element(by.css('.task')).getText().then(pushResult);
        }
        function pushResult(text) {
          results.push(text);
          resultsPushed ++;
          if(resultsPushed === count) {
            expect(results).toEqual(['Task 0', 'Task 1', 'Task 2']);
            done();
          }
        }
      });
    });

    it('can delete a task', function(done) {
      browser.get('http://localhost:8080');
      var elements = element.all(by.repeater('toDo in ctrl.toDos'))
      elements.first().element(by.css('.checkbox')).click().then(function() {
        element(by.css('.delete-btn')).click().then(function() {
          elements.count().then(function(count) {
            expect(count).toEqual(2);
            done();
          })
        })
      })
    });

    it('can mark a task as completed', function(done) {
      browser.get('http://localhost:8080');
      var elem = element.all(by.repeater('toDo in ctrl.toDos')).last();
      elem.element(by.css('.checkbox')).click().then(function() {
        element(by.css('.completed-btn')).click().then(function() {
          var todo = elem.element(by.css('.task'));
          todo.getCssValue('text-decoration').then(function(value) {
            expect(value).toEqual('line-through');
            done();
          })
        })
      })
    })

    it('can edit a task', function(done) {
      var task = 'I need to do this differently';
      var category = 'Some other category';
      browser.get('http://localhost:8080');
      var toDo = element.all(by.repeater('toDo in ctrl.toDos')).last();
      toDo.element(by.css('.edit-btn')).click().then(enterDetails);

      function enterDetails() {
        var taskField = element(by.model('ctrl.editedTask'));
        var categoryField = element(by.model('ctrl.editedCategory'));
        taskField.clear().then(function() {
          taskField.sendKeys(task).then(function() {
            categoryField.clear().then(function() {
              categoryField.sendKeys(category).then(function() {
                element(by.css('.save-btn')).click().then(evaluate);
              })
            })
          })
        })
      }

      function evaluate() {
        toDo.element(by.css('.task')).getText().then(function(text) {
          expect(text).toEqual(task);
          toDo.element(by.css('.category')).getText().then(function(text) {
            expect(text).toEqual(category);
            done();
          })
        })
      }
    })

  });
});
