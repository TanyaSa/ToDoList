class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.on('add:todoItem', () => this.add());
        this.view.on('delete:todoItem', (todoItem) => this.delete(todoItem));
        this.view.on('update:todoItem', (todoItem) => this.update(todoItem));
    }

    add() {
        const todoItem = this.model.createItem();
        this.view.renderTodoItem(todoItem);
        this.model.updateItem(todoItem);
        this.view.refreshView();
    }

    update(e) {
        let todoItem = e.todoItem;
        todoItem.text = e.newText;
        todoItem.isCompleted = e.newState;
        // todoItem.time = e.newTime;
        this.model.updateItem(todoItem);
    }

    delete(todoItem) {
        console.log(todoItem);
        this.model.deleteItem(todoItem);
        this.view.refreshView();
    }
}