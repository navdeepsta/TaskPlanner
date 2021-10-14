/* Input elements [ taskName, taskDescription, taskAssign, taskDate, taskStatus] and 
   variables [nameData, descriptionData, taskAssignData, taskDateData, taskStatusData, errorMessage] 
   are declered in validation.js */

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
   taskManager.saveFile();
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
    let card = document.createElement("div");
    let currentTask = taskManager.getCurrentTask();
    let bgColor = getTaskStatusColor( currentTask );  
    card.innerHTML = render( bgColor, currentTask);
    if(taskManager.viewState) {
        cardContainer.appendChild( card );
    }else{
        addTaskToMultiColumnContainer( card, currentTask );
    }
    onCardButtonClick();
    dragAndDrop();

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

function render( bgColor, task) {  
    let cardLayout =`<div class ="child draggable" draggable="true" card-id=${task.taskId}> 
                    <div class = "box box-1  ${bgColor} text-dark bg-opacity-25">
                        <span class="card-status ${bgColor}" bg-opacity-75>${task.status}</span>
                        <span class="card-name">${task.name}</span>
                        <span class="card-date date">${task.date}</span>
                    </div>
                    <div class = "box box-2">
                        <p class="card-description">${task.description}</p>
                    </div>
                    <div class = "box box-3">
                        <img src="images/person.svg" alt="assigned to"/>
                        <p class="card-assign">${task.assign}</p>
                    </div>
                    <div class = "box box-4">
                        <img class="card-done me-1" card-id=${task.taskId} src="images/check-square.svg" alt="done"/>
                        <img class="card-edit" card-id=${task.taskId} src="images/edit.svg" alt="edit"/>
                        <img class="card-delete" card-id=${task.taskId} src="images/trash.svg" alt="delete"/>
                    </div>   
                </div>`

        return cardLayout;
}


function onCardButtonClick() {
    let cardDone = document.getElementsByClassName("card-done");
    let cardEdit = document.getElementsByClassName("card-edit");
    let cardDelete = document.getElementsByClassName("card-delete");
    let cards = document.getElementsByClassName("child");

    Array.from(cards).forEach(card=>{
        card.onmouseover = ()=>{
            card.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }
        card.onmouseout = ()=>{
            card.style.boxShadow = ''
        }
    })
    
    Array.from(cardDone).forEach( done => {
        done.onmousedown = () => {
            done.style.padding = "5px";
            let id =  parseInt(done.getAttribute('card-id'), 10);
            let task = taskManager.getTask( id );
            task.status = 'Done';
            taskManager.saveFile();
            location.reload();
        };
    })

    Array.from(cardEdit).forEach( edit => {
        edit.onmousedown = () => {
            edit.style.padding = "2px";
        };
    })

    Array.from(cardEdit).forEach( edit => {
        edit.onmouseup = () => {
            edit.style.padding = "";
            edit.style.backgroundColor = "";
            edit.setAttribute('data-bs-toggle', 'modal');
            edit.setAttribute('data-bs-target',' #exampleModal');
            taskSubmit.style.display = 'none';
            taskReset.style.display = 'none';
            taskSave.style.display = 'block';
            
            let id =  parseInt(edit.getAttribute('card-id'), 10);
            let task = taskManager.getTask( id );
            taskName.value = task.name;
            taskDescription.value = task.description;
            taskAssign.value = task.assign;
            taskStatus.value = task.status;

            let dateArray = task.date.split(' ');
            let month = months.indexOf(dateArray[1]);
            ++month;
            if( month < 10 ) {
                month = '0' + (month);
            }
            let day = dateArray[0];
            if( day < 10 ) {
                day = '0' + day;
            }
            taskDate.value = dateArray[2]+"-"+ month +"-"+day;

            taskSave.addEventListener('click', () => {
                task.name = taskName.value;
                task.description = taskDescription.value;
                task.assign = taskAssign.value;
                task.status = taskStatus.value;
                
                let dateArray = taskDate.value.split('-');
                let day = dateArray[2];
                if( day.charAt(0) == '0') {
                    day = day.charAt(1);
                }
                let month =  parseInt(dateArray[1], 10);
                task.date = day+" "+months[month-1]+" "+dateArray[0];
           
                taskManager.saveFile();
                location.reload();
            })
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


window.addEventListener('load', (event) => {
    taskManager.loadFile();
    displayCardsOnPageLoad();
    toggleMarkAsDone();

  });
 

  function displayCardsOnPageLoad() {
    const tasks = taskManager.tasks;

    tasks.forEach( task => {
        const card = document.createElement("div");
        const bgColor = getTaskStatusColor( task );  
        card.innerHTML = render(bgColor, task);
 
       if(taskManager.viewState) {
           cardContainer.appendChild(card);
           multiColumnView.style.display = 'none'
       }
       else{
        addTaskToMultiColumnContainer( card, task );  
       }
         
        onCardButtonClick( task );
    });

    dragAndDrop();

  }

  function addTaskToMultiColumnContainer( card, task ) {
    card.getElementsByClassName('card-status')[0].style.display = 'none';
        if(task.status === 'To Do')
            todoContainer.appendChild(card);

        else if(task.status === 'In Progress')
            progressContainer.appendChild(card);

        else if(task.status === 'Review')
            reviewContainer.appendChild(card);

        else if(task.status === 'Done') 
            doneContainer.appendChild(card)

  }
  
  function dragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.mv-container');
    draggables.forEach( draggable => {
        draggable.addEventListener('dragstart', ()=>{
            draggable.classList.add('dragging');
        })
      
        draggable.addEventListener('dragend', ()=>{
            draggable.classList.remove('dragging');

        })
       
        let x = 0;
        containers.forEach( container=>{
            container.addEventListener('dragover', event =>{
                event.preventDefault();
                const draggable = document.querySelector('.dragging');
                let id =  parseInt(draggable.getAttribute('card-id'), 10);
                const task = taskManager.getTask(id);
                task.status = container.firstChild.textContent.trim();
                taskManager.saveFile();
                location.reload();
                
                container.appendChild(draggable);
            });
        });

    })
}

  function toggleMarkAsDone() {
    let  cardDone = document.getElementsByClassName('card-done')
    Array.from(cardDone).forEach( done => {
        let task = taskManager.getTask(parseInt(done.getAttribute('card-id')))
        if(task.status === 'Done') {
            console.log('done')
            done.style.display = 'none'
        }else{
            done.style.display = 'block'
        }
    })
  }

  viewSelector.onclick = ()=>{
        if( taskManager.viewState === true) {
            taskManager.viewState = false
        }else{
            taskManager.viewState = true
        }
        taskManager.saveFile();
        location.reload()
        
}