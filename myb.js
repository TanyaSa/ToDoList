//import view from ''

/*
let checklist = document.querySelector('#checklist');
let addButton = document.querySelector('#addbutton');
//switching done and in process styles
const checkboxClickHandler = function(e) {
    let checkbox = e.target;
    let inputText = checkbox.parentElement.parentElement.children[1];
    inputText.classList.toggle('checked');
};
const removeItemHandler = function(e) {
    let deleteButton = e.target;
    let fullItem = deleteButton.parentElement;
    fullItem.remove();
};
const addItemHandler = function() {

    let innerHtmlText = '<div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"></div><input type="text" class="form-control" placeholder="Enter description here..." aria-label="Recipient\'s username" aria-describedby="button-addon2"><button class="btn btn-outline-secondary" type="button" id="button-addon2">Remove</button>';

    let fullItem = document.createElement("div");
    fullItem.innerHTML = innerHtmlText;
    fullItem.className = "input-group mb-3";

    checklist.appendChild(fullItem);

    let checkBox = checklist.lastChild;
    let g = checkBox.firstChild;
    let r = g.firstChild;
    //let a = checkBox.document.querySelector('#checklist input[type="checkbox"]');  //////how I can change it?
    r.addEventListener('click', checkboxClickHandler);

    let rem = checkBox.lastChild;
    rem.addEventListener('click', removeItemHandler);
};
//why after removing block ti the begin-dont work??????????
//listener for clicking on checkboxes
const allCheckboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
for (let i = 0; i < allCheckboxes.length; i++) {
    let checkbox = allCheckboxes[i];

    checkbox.addEventListener('click', checkboxClickHandler);
};
const allRemoveButtons = document.querySelectorAll('#button-addon2');
for (let i = 0; i < allRemoveButtons.length; i++) {
    let button = allRemoveButtons[i];

    button.addEventListener('click', removeItemHandler);
};
addButton.addEventListener('click', addItemHandler);
 //how I can change blue border?
//how can I change padding???
// let checklist = document.querySelector('#checklist');
// let addButton = document.querySelector('#addbutton');
//switching done and in process styles
//why after removing block ti the begin-dont work??????????
//listener for clicking on checkboxes
*/



document.addEventListener("DOMContentLoaded", () => {
    var date = document.querySelector('.title_text');
    var month = document.querySelector('.month');
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"];
    dateNow = new Date();
    var n = weekday[dateNow.getDay()];
    var day = dateNow.getDate();
    date.innerHTML =  n + "," + " " + day + 'th';
    month.innerHTML = months[dateNow.getMonth()];
    var application = new Application();
    // application.model.todoList.push({ text: 'TEST', isCompleted: true });
    application.start();
});


class Application {
    constructor() {
        this.model = new Model();
        this.view = new View(this.model);
        this.controller = new Controller(this.view, this.model);

    }

    start() {
        this.view.refreshView();
    }
}

class View {
    model;
    checklist;
    addButton;

    events = {};

    // TODO
    // OOP -> OOP in JS

    // conjunctions замикання
    // this and context
    // lambda function

    // types in JS
    // value types vs reference types

    constructor(model) {
        this.model = model;
        // this.titleToDO = document.querySelector('.title_todo');
        this.checklist = document.querySelector('#checklist');
        this.addButton = document.querySelector('#addbutton');
        this.count = document.querySelector('.count');
        this.addButton.addEventListener('click', (e) => this.dispatch('add:todoItem', e));
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    dispatch(eventName, event) {
        if (this.events[eventName]) {
            let subscribers = this.events[eventName];
            for (let i = 0; i < subscribers.length; i++) {
                subscribers[i](event);
            }
        }
      
    }

    refreshView() {
        this.checklist.innerHTML = "";
        console.log(this.model.todoList);
        if(localStorage.getItem("Value")!= null){
            this.model.todoList = JSON.parse(localStorage.getItem("Value"))
            for (let i = 0; i < this.model.todoList.length; i++) {
                let currentTodoItem = this.model.todoList[i];
                this.renderTodoItem(currentTodoItem);
                console.log(this.model.todoList);
                if(this.model.todoList.length < 2){
                    this.count.innerHTML = this.model.todoList.length + " " + "Task";
                }else{
                    this.count.innerHTML = this.model.todoList.length + " " + "Tasks";
                }
                localStorage.setItem("Value", JSON.stringify(this.model.todoList))
            }
        }else{
            this.model.todoList.push({ text: 'TEST', isCompleted: true });
            for (let i = 0; i < this.model.todoList.length; i++) {
                let currentTodoItem = this.model.todoList[i];
                this.renderTodoItem(currentTodoItem);
                if(this.model.todoList.length < 2){
                    this.count.innerHTML = this.model.todoList.length + " " + "Task";
                }else{
                    this.count.innerHTML = this.model.todoList.length + " " + "Tasks";
                }
                
            }
            console.log(this.model.todoList);
            localStorage.setItem("Value", JSON.stringify(this.model.todoList))
        }

       
    };

    renderTodoItem(todoItem) {
        let todoItemContainer = document.createElement("div");
        todoItemContainer.className = "input-group mb-3";

        let checkBoxWrapper = document.createElement('div');
        checkBoxWrapper.className = "input-group-text";

        let checkbox = document.createElement("input");
        checkbox.className = "form-check-input mt-0";
        checkbox.type = "checkbox";
        checkbox.attributes["aria-label"] = "Checkbox for following text input";
        checkbox.checked = todoItem.isCompleted;
        checkbox.addEventListener('click', (e) => this.dispatch('updateState:todoItem', {
            todoItem,
            newText: input.value,
            newState: checkbox.checked
        }));
        checkBoxWrapper.appendChild(checkbox);

        let input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";
        input.placeholder = "Enter description here...";
        input.value = todoItem.text;
        input.addEventListener('keyup', (e) => this.dispatch('updateInput:todoItem', {
            todoItem,
            newText: input.value,
            newState: checkbox.checked
        }));

        // if (input.focus) {
        //     todoItemContainer.className = "input-group mb-3 activeInput";
        // }else{
        //     todoItemContainer.className = "input-group mb-3";
        // }
        input.onfocus = function(){
            todoItemContainer.className = "input-group mb-3 activeInput";
        }
        input.onblur = function(){
            todoItemContainer.className = "input-group mb-3";
        }

        let button = document.createElement("button");
        // button.className = "btn btn-outline-secondary";
        button.className = "btn";
        button.type = "button";
        // button.innerText = "Remove";
        button.addEventListener('click', (e) => this.dispatch('delete:todoItem', todoItem));

        todoItemContainer.appendChild(checkBoxWrapper);
        todoItemContainer.appendChild(input);
        todoItemContainer.appendChild(button);
        checklist.appendChild(todoItemContainer);

        let test = input.value;
        console.log(test);

        if(!todoItem.isCompleted){
            todoItemContainer.style.textDecoration = "none";   
            
          }else{
             
              todoItemContainer.style.textDecoration = "line-through";
              todoItemContainer.style.color = "#d9d9e7";
              input.style.color =  "#d9d9e7";
          }
       
    }
    updateTodoItem(e) {
        let val = e.value;
        console.log(val);
    }

}

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.on('add:todoItem', () => this.add());
        this.view.on('delete:todoItem', (todoItem) => this.delete(todoItem));
        this.view.on('updateState:todoItem', (todoItem) => this.updateState(todoItem)); ///////////////////////////??????????????????????
        this.view.on('updateInput:todoItem', (todoItem) => this.updateInput(todoItem));
    }

    add() {
        const todoItem = this.model.createItem();
        this.view.renderTodoItem(todoItem);
        this.view.refreshView();
    }

    updateState(e) { /////////////////////////////////////////////////////????????????????????????????????????????????????????????????????
        let todoItem = e.todoItem;
        todoItem.text = e.newText
        todoItem.isCompleted = e.newState;
        this.model.updateItem(todoItem);
        this.view.refreshView()
        
    }
    updateInput(e) { /////////////////////////////////////////////////////????????????????????????????????????????????????????????????????
        
        let todoItem = e.todoItem;
        todoItem.text = e.newText
        todoItem.isCompleted = e.newState;
        this.model.updateItem(todoItem); 
    }

    delete(todoItem) {
        console.log(todoItem);
        this.model.deleteItem(todoItem);
        this.view.refreshView();
    }
}

//let itemId = 0; 
class Model {
    todoList = [];


    constructor() {
        var itemsKeys = Object.keys(localStorage);
        for (let j = 0; j < itemsKeys.length; j++) {
            this.todoList.push(JSON.parse(localStorage[itemsKeys[j]]));
        }
    }


    /**
     * Add todo item to the model
     * @param {TodoListItem} todoItem 
     */
    createItem() {
        let item = new TodoListItem();
        this.todoList.push(item);

        localStorage.setItem('Value', JSON.stringify(this.todoList));
        return item;
    }

    deleteItem(item) {
        const index = this.todoList.indexOf(item);
        if (index > -1) {
            this.todoList.splice(index, 1);
            // save to local storage
            localStorage.removeItem('Value');
            localStorage.setItem('Value', JSON.stringify(this.todoList));
        }
    }

    updateItem(item) {
        localStorage.setItem('Value', JSON.stringify(this.todoList));
    }

}

class TodoListItem {
    text = '';
    isCompleted = false;
}