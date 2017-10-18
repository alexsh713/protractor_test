

describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    element.all(by.repeater('todo in todoList.todos')).filter(function(elem,index){
    	return elem.getText().then(function(text){
    		return text == 'write first protractor test'
    	});
    }).then(function(filteredElements){
    	filteredElements[0].click();
    });
    
    browser.sleep(10000);
  });
});


