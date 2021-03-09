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
      
        // for(let i = 0; i < this.todoList.length; i++){
        //     delete this.todoList[i].dec,
        //     delete this.todoList[i].minutes,
        //     delete this.todoList[i].hours,
        //     delete this.todoList[i].ampm
        // }
        localStorage.setItem('Value', JSON.stringify(this.todoList));
    }

}