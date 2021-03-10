class Model {
    todoList = [];


    constructor() {
        var itemsKeys = Object.keys(localStorage);
        for (let j = 0; j < itemsKeys.length; j++) {
            let item = JSON.parse(localStorage[itemsKeys[j]]);
            item.createdAt = new Date(item.createdAt);
            this.todoList.push(item);
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
        console.log(this.todoList)
    }

}