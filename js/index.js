/*  Selecting elements from the index.html  */
const taskSubmit = document.querySelector('#task-submit');
const taskReset = document.querySelector('#task-reset');
const taskName = document.querySelector('#task-name');
const taskDescription = document.querySelector('#task-description');
const taskAssign = document.querySelector('#task-assign');
const taskDate = document.querySelector('#task-date');
const taskStatus = document.querySelector('#task-status');
const spanError =  document.getElementsByClassName('err-task');
const errors = [true, true, true, true, true];

/* Declaring variables to store form field values */
let nameData, descriptionData, taskAssignData, 
    taskDateData, taskStatusData, errorMessage;

/* Applying event listeners on input fields */
taskName.addEventListener('focusout', ()=>{
    nameData = taskName.value;
    errorMessageGenerator(taskName, spanError[0], nameData);  
    updateSubmission();
});

taskDescription.addEventListener('focusout', ()=>{
    descriptionData = taskDescription.value;
    errorMessageGenerator(taskDescription, spanError[1], descriptionData);
    updateSubmission();
});

taskAssign.addEventListener('focusout', ()=>{
    taskAssignData = taskAssign.value;
    errorMessageGenerator(taskAssign, spanError[2], taskAssignData);
    updateSubmission();
});

taskDate.addEventListener('focusout', ()=>{
    taskDateData = taskDate.value;
    if( !taskDateData ) {
        errorMessageGenerator(taskDate, spanError[3], '');
        errorMessage =' Enter the correct date';
        spanError[3].innerHTML = errorMessage;
    } else {
        errorMessageStyleReset(taskDate, spanError[3]);
        
    }
   
});

taskStatus.addEventListener('focusout', ()=>{
    taskStatusData = taskStatus.value;
    if( taskStatusData === 'Select...')
    {
        errorMessageGenerator(taskStatus, spanError[4], '');
        errorMessage = ' Select a status';
        spanError[4].innerHTML = errorMessage;
    } else{
        errorMessageStyleReset(taskStatus, spanError[4]);
    }
});

function errorMessageGenerator( parentElement, spanElement, data ) {   
    data.length < 5   ? errorMessageStyle(parentElement, spanElement) 
                      : errorMessageStyleReset(parentElement, spanElement);
}

function errorMessageStyle( parentElement, spanElement ) {
    parentElement.style.border = '1px solid red';
    errorMessage = ' Enter alteast 5 letters';
    spanElement.innerHTML = errorMessage;
    spanElement.style.color = 'red';
    updateErrors(parentElement, true);
}

function errorMessageStyleReset( parentElement, spanElement ) {
    spanElement.innerHTML = '';
    parentElement.style.border = '';
    updateErrors(parentElement, false);  
}

function updateErrors( parentElement, errorFlag ) {
    switch( parentElement.id ) {
        case taskName.id:
            errors[0] = errorFlag;
            break;
        case taskDescription.id:
            errors[1] = errorFlag;
            break;
        case taskAssign.id:
            errors[2] = errorFlag;
            break;
    } 
}

// enable or disable submit button based on the result of validation
function updateSubmission() {
    if(errors[0] || errors[1] || errors[2]) {
        taskSubmit.disabled = true;
    }else{
        taskSubmit.disabled = false;
    }
}

taskSubmit.addEventListener('click', validFormFieldInput);

const taskManager = new TaskManager();
