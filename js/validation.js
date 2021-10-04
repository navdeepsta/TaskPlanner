/*  Selecting elements from the index.html  */
const taskSubmit = document.querySelector("#task-submit");
const taskReset = document.querySelector("#task-reset");
const taskName = document.querySelector("#task-name");
const taskDescription = document.querySelector("#task-description");
const taskAssign = document.querySelector("#task-assign");
const taskDate = document.querySelector("#task-date");
const taskStatus = document.querySelector("#task-status");
const spanError = document.getElementsByClassName("err-task");
const taskSave = document.getElementById("task-save");
const cardContainer = document.querySelector("#card-section");
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
    let day = now.getDate();
    if( day < 10 ) {
        day = '0' + day;
    }

    let currentDate = now.getFullYear() + "-" + month + "-" + day;
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