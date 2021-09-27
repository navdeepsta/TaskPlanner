class TaskManager {
    constructor(currentId = 0) {
        this._tasks = [];
        this._currentId = currentId;
    }

    get tasks() {
        return this._tasks;
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
            console.log(this._tasks.length);
    }
}
