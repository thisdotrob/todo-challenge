var utils = require('./../utils');
var ToDo = require('mongoose').model('ToDo');

describe('ToDo app', function() {

  it('has the correct title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('ToDo');
  });

  it('can add a task', function(done) {
    browser.get('http://localhost:8080');
    var expected = 'I need to do this';
    element(by.model('ctrl.draftToDo')).sendKeys(expected);
    element(by.id('submit-btn')).click();
    var toDo = element.all(by.id('todo-list')).first();
    expect(toDo.getText()).toEqual(expected);
    done();
  })

  it('loads pre-entered tasks on page load', function(done) {
    var expected = ['task1','task2','task3'];
    var result = [];
    var count = 0;

    var startTest = function() {
      browser.get('http://localhost:8080');
      var els = element.all(by.repeater('toDo in ctrl.toDos'));
      for (var i = 0; i < expected.length; i++) {
        els.get(i).getText().then(compileResult);
      }
    }

    var compileResult = function(text) {
      result.push(text);
      count--;
      if(count === 0){
        evaluate();
      }
    }

    var evaluate = function() {
      expect(result).toEqual(expected);
      done();
    }

    var callback = function(err, createdTodo) {
      count++;
      if(count === expected.length) {
        startTest();
      }
    }

    for (var i = 0; i < expected.length; i++) {
        ToDo.create({task: expected[i]}, callback)
    }
  })

});
