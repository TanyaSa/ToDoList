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

    constructor(model, containerId) {
        this.model = model;
        this.containerId = containerId;

        this.container = document.getElementById(containerId);

        // this.titleToDO = document.querySelector('.title_todo');
        this.checklist = this.container.querySelector('.checklist');
        this.addButton = this.container.querySelector('.addbutton');
        this.count = this.container.querySelector('.count');

        //for (let i = 0; i < this.addButton.length; i++) {
        this.addButton.addEventListener('click', (e) => this.dispatch('add:todoItem', e));

        //}
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

        //for (let j = 0; j < this.checklist.length; j++) {

        this.checklist.innerHTML = "";
        console.log(this.model.todoList);

        if (localStorage.getItem(this.containerId) != null) { ///////////////////////////
            this.model.todoList = JSON.parse(localStorage.getItem(this.containerId))
            for (let i = 0; i < this.model.todoList.length; i++) {
                let currentTodoItem = this.model.todoList[i];
                this.renderTodoItem(currentTodoItem);

                localStorage.setItem(this.containerId, JSON.stringify(this.model.todoList))
            }
            console.log(this.model.todoList);
        } else {
            // this.model.todoList.push({ text: 'TEST', isCompleted: true });
            for (let i = 0; i < this.model.todoList.length; i++) {
                let currentTodoItem = this.model.todoList[i];
                this.renderTodoItem(currentTodoItem);
            }
            console.log(this.model.todoList);
            localStorage.setItem(this.containerId, JSON.stringify(this.model.todoList))
        }
        //for (let i = 0; i < this.count.length; i++) {
        if (this.model.todoList.length < 2 && this.model.todoList.length != 0) {
            this.count.innerHTML = this.model.todoList.length + " " + "Task";
        } else if (this.model.todoList.length == 0) {
            this.count.innerHTML = "0" + " " + "Tasks";
        } else {
            this.count.innerHTML = this.model.todoList.length + " " + "Tasks";
        }
        //}
        // }

    };

    // createToDoItem(todoItem) {
    //     let todoItemContainer = document.createElement("div");
    //     //write generating one new item

    //     return todoItemContainer;
    // }


    //separate and remove
    renderTodoItem(todoItem) {
        //for (let j = 0; j < this.checklist.length; j++) {
        let todoItemContainer = document.createElement("div");
        todoItemContainer.className = "input-group mb-3";

        let checkBoxWrapper = document.createElement('div');
        checkBoxWrapper.className = "input-group-text";
        checkBoxWrapper.style.outline = "none";

        let dateBox = document.createElement("div");
        dateBox.innerHTML = new Date(todoItem.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        dateBox.className = "time";

        let checkbox = document.createElement("input");
        checkbox.className = "form-check-input mt-0";
        checkbox.type = "checkbox";
        checkbox.attributes["aria-label"] = "Checkbox for following text input";
        checkbox.checked = todoItem.isCompleted;
        checkbox.addEventListener('click', (e) => this.dispatch('update:todoItem', {
            todoItem,
            newText: input.value,
            newState: checkbox.checked,
            newTime: todoItem.createdAt
        }));
        checkBoxWrapper.appendChild(checkbox);

        let input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";

        input.placeholder = "Enter description here...";
        input.value = todoItem.text;
        input.addEventListener('keyup', (e) => this.dispatch('update:todoItem', {
            todoItem,
            newText: input.value,
            newState: checkbox.checked,
            newTime: todoItem.createdAt
        }));



        let button = document.createElement("button");
        button.className = "btn";
        button.type = "button";
        button.addEventListener('click', (e) => this.dispatch('delete:todoItem', todoItem));


        todoItemContainer.appendChild(checkBoxWrapper);
        todoItemContainer.appendChild(input);
        todoItemContainer.appendChild(dateBox);
        todoItemContainer.appendChild(button);


        this.checklist.appendChild(todoItemContainer);


        if (!checkbox.checked) {
            input.style.textDecoration = "none";
            input.style.color = "#82829c";
        } else {
            input.style.textDecoration = "line-through";
            input.style.color = "#d9d9e7";
        }

        todoItemContainer.addEventListener('click', selectElement, true);


        function selectElement() {
            let allItems = todoItemContainer.parentElement.querySelectorAll('.input-group');
            for (let i = 0; i < allItems.length; i++) {
                allItems[i].classList.remove('active');
            }

            todoItemContainer.classList.add('active');
            if (!checkbox.checked) {
                input.style.textDecoration = "none";
                input.style.color = "#82829c";
            } else {
                input.style.textDecoration = "line-through";
                input.style.color = "#d9d9e7";
            }
        }
        //}

    }


    //renderTodoItemInCheclist(chekListId, todoItem) {

    //}

    updateTodoItem(e) {
        let val = e.value;
        console.log(val);
    }



    // renderCheckList(checkListId, itemsList) {
    //const cardElement = this.generateCardElement(checkListId);

    //const checkList = cardElement.querySelector(`checkList-${checkListId}`);



}

// generateCardElement(cardSufix) {
//     // Add check that list is exist
//     const cardContent = `
//     <div class="title_todo">
//         <div class="date">
//             <div class="header_title">
//                 <h1 class="title_text"></h1>
//                 <div class="count-${cardSufix}"></div>
//             </div>
//             <div class="month"></div>
//         </div>

//         <button type="button" id="addbutton-${cardSufix}" class="addBtn"><div class="plus">&#43;</div></button>
//     </div>

//     <div id="checklist-${cardSufix}"></div>
//     `

//     const cardDiv = document.createElement('div');
//     cardDiv.classList.add('inner_card');
//     cardDiv.innerHTML = cardContent;

//     return cardDiv;
// }