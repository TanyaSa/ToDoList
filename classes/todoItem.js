class TodoListItem {
    constructor(){
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.ampm = this.hours >= 12 ? 'pm' : 'am';
        this.dec = this.minutes<10?'0':''
        this.time = this.hours + ":" + this.dec + this.minutes + " " + this.ampm;
    }
    text = '';
    isCompleted = false;
    time = this.time;
}