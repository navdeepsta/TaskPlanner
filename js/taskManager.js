class TaskManager {
    constructor(currentId = 0) {
        this._tasks = [];
        this._currentId = currentId;
        this._myStorage = window.localStorage;
    }

    get tasks() {
        return this._tasks;
    }

    getCurrentTask() {
        if( this._tasks.length > 0) {
            return this._tasks[this._tasks.length - 1];
        }
    }

    addTask(taskName, taskDescription, taskAssign, taskDate, taskStatus) {
        const task = {
            taskId:  ++this._currentId,
            name: taskName,
            description: taskDescription, 
            assign: taskAssign, 
            date: taskDate, 
            status: taskStatus
        }
        this._tasks.push(task);
    }

    deleteTask( id ) {
         for(let i = 0; i < this._tasks.length; ++i) {
                if(this._tasks[i].taskId === id) {
                    this._tasks.splice(i, 1);
                }
            }
            this.saveFile();
    }

    loadFile() {
        const tasks = this._myStorage.getItem('tasks');
        if( tasks) {
        this._tasks = JSON.parse(tasks);
        this._currentId = this.tasks.length;
        this._tasks.forEach( task =>{
            console.log(task.taskId+" "+task.name+" "+task.status);
        })
    }
    }

    getTask( id ) {
        for(let i = 0; i < this._tasks.length; ++i) {
            if(this._tasks[i].taskId === id) {
                return this._tasks[i];
            }
        }
    }

    saveFile() {
        this._myStorage.setItem('tasks', JSON.stringify(this._tasks));
    }
}
