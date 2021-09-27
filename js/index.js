/*  Selecting elements from the index.html  */
const taskSubmit = document.querySelector("#task-submit");
const taskReset = document.querySelector("#task-reset");
const taskName = document.querySelector("#task-name");
const taskDescription = document.querySelector("#task-description");
const taskAssign = document.querySelector("#task-assign");
const taskDate = document.querySelector("#task-date");
const taskStatus = document.querySelector("#task-status");
const spanError = document.getElementsByClassName("err-task");

const errors = [true, true, true, true, true];
const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

/* Declaring variables to store form field values */
let nameData,
    descriptionData,
    taskAssignData,
    taskDateData,
    taskStatusData,
    errorMessage;

/* Applying event listeners on input fields */
taskName.addEventListener("focusout", () => {
    nameData = taskName.value;
    errorMessage = " Enter alteast 5 letters";
    errorMessageGenerator(taskName, spanError[0], nameData, errorMessage);
    updateSubmission();
});

taskDescription.addEventListener("focusout", () => {
    descriptionData = taskDescription.value;
    errorMessage = " Enter alteast 5 letters";
    errorMessageGenerator(
        taskDescription,
        spanError[1],
        descriptionData,
        errorMessage
    );
    updateSubmission();
});

taskAssign.addEventListener("focusout", () => {
    taskAssignData = taskAssign.value;
    errorMessage = " Enter alteast 5 letters";
    errorMessageGenerator(taskAssign, spanError[2], taskAssignData, errorMessage);
    updateSubmission();
});

taskDate.onclick = () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let currentDate = now.getFullYear() + "-" + month + "-" + now.getDate();
    taskDate.setAttribute("min", currentDate);

};

taskDate.addEventListener("focusout", () => {
    taskDateData = taskDate.value;
    errorMessage = " Select date";
    !taskDateData
        ? errorMessageGenerator(taskDate, spanError[3], "", errorMessage)
        : errorMessageStyleReset(taskDate, spanError[3]);

    let d = new Date(taskDateData);
    taskDateData = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    updateSubmission();
});

taskStatus.addEventListener("focusout", () => {
    taskStatusData = taskStatus.value;
    errorMessage = " Select status";
    taskStatusData === "Select..."
        ? errorMessageGenerator(taskStatus, spanError[4], "", errorMessage)
        : errorMessageStyleReset(taskStatus, spanError[4]);
    updateSubmission();
});

function errorMessageGenerator(parentElement, spanElement, data, errorMessage) {
    data.length < 5
        ? errorMessageStyle(parentElement, spanElement, errorMessage)
        : errorMessageStyleReset(parentElement, spanElement);
}

function errorMessageStyle(parentElement, spanElement, errorMessage) {
    parentElement.style.border = "1px solid red";
    spanElement.innerHTML = errorMessage;
    spanElement.style.color = "red";
    spanElement.style.backgroundColor = "#eee";
    spanElement.style.marginLeft = "10px";
    spanElement.style.padding = "5px";
    spanElement.style.borderRadius = "5px";
    updateErrors(parentElement, true);
}

function errorMessageStyleReset(parentElement, spanElement) {
    spanElement.innerHTML = "";
    parentElement.style.border = "";
    spanElement.style.backgroundColor = "";
    updateErrors(parentElement, false);
}

function updateErrors(parentElement, errorFlag) {
    switch (parentElement.id) {
        case taskName.id:
            errors[0] = errorFlag;
            break;
        case taskDescription.id:
            errors[1] = errorFlag;
            break;
        case taskAssign.id:
            errors[2] = errorFlag;
            break;
        case taskDate.id:
            errors[3] = errorFlag;
            break;
        case taskStatus.id:
            errors[4] = errorFlag;
            break;
    }
}

// enable or disable submit button based on the result of validation
function updateSubmission() {
    if (errors[0] || errors[1] || errors[2] || errors[3] || errors[4]) {
        taskSubmit.disabled = true;
    } else {
        taskSubmit.disabled = false;
    }
}

const taskManager = new TaskManager();
function validFormFieldInput(event) {
    resetValues();
    taskManager.addTask(
        nameData,
        descriptionData,
        taskAssignData,
        taskDateData,
        taskStatusData,
        errorMessage
    );

    createCard(event);
    taskSubmit.disabled = true;
}

function resetValues() {
    taskName.value = ''; 
    taskDescription.value = '';
    taskAssign.value = '';
    taskDate.value = '';
    taskStatus.value = 'Select...';
}

function createCard(event) {
    event.preventDefault();
    const cardContainer = document.querySelector("#card-section");
    const tasks = taskManager.tasks;
    let card = document.createElement("div");
    tasks.forEach( task => {
        let bgColor = getTaskStatusColor( task );  
        card.innerHTML = `<div class ="child"> 
                                <div class = "box box-1  ${bgColor} text-dark bg-opacity-25">
                                    <span class="card-status ${bgColor}" bg-opacity-75>${task.status}</span>
                                    <span class="card-name">${task.name.substring(0, 20)}</span>
                                    <span class="card-date date">${task.date}</span>
                                </div>
                                <div class = "box box-2">
                                    <p class="card-description">${task.description.substring(0, 140)}</p>
                                </div>
                                <div class = "box box-3">
                                    <img src="images/person.svg" alt="assigned to"/>
                                    <p class="card-assign">${task.assign.substring(0, 20)}</p>
                                </div>
                                <div class = "box box-4">
                                    <img class="card-edit" card-id=${task.taskId} src="images/edit.svg" alt="edit"/>
                                    <img class="card-delete" card-id=${task.taskId} src="images/trash.svg" alt="delete"/>
                                </div>   
                            </div>`;
            
        cardContainer.appendChild(card);
        onCardButtonClick( task );
    });
}

function getTaskStatusColor( task ) {
    switch( task.status ) {
        case 'Done':
            return 'bg-success';
        case 'Review':
            return 'bg-info text-dark';
        case 'In Progress':
            return 'bg-secondary';
        default : return 'bg-primary';
    }
}

function onCardButtonClick( task ) {
    let cardEdit = document.getElementsByClassName("card-edit");
    let cardDelete = document.getElementsByClassName("card-delete");

    Array.from(cardEdit).forEach( edit => {
        edit.onmousedown = () => {
            edit.style.padding = "2px";
        };
    })

    Array.from(cardEdit).forEach( edit => {
        edit.onmouseup = () => {
            edit.style.padding = "";
            edit.style.backgroundColor = "";
        };
    })

    Array.from(cardDelete).forEach( del => {
        del.onmousedown = () => {
            del.style.padding = "2px";
        };
    })
    
    Array.from(cardDelete).forEach( del => {
        del.onmouseup = () => {
            del.style.padding = "";
            del.style.backgroundColor = "";
            let id =  parseInt(del.getAttribute('card-id'), 10);
            taskManager.deleteTask(id);
            del.parentElement.parentElement.style.display = 'none';
        };
    })
}

taskSubmit.addEventListener('click', validFormFieldInput);
taskReset.addEventListener('click', () => taskSubmit.disabled = true);

